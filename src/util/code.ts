import * as  redis from 'redis';
import * as captcha from 'trek-captcha';
import { guid } from './guid';
import { Defer } from './Defer';
import { createWriteStream, unlink } from 'fs';
import { resolve } from 'path';
class Code {
    private code = {};
    private subscriberClient = redis.createClient();
    private schedQueueClient = redis.createClient();
    constructor() {

        this.subscriberClient.on('pmessage', (pattern, channel, expiredKey) => {
            this.removeCode(expiredKey);
            // TODO: push expiredKey onto some other list to proceed to order fulfillment
        });
        // subscribe to key expire events on database 0
        this.subscriberClient.psubscribe('__keyevent@0__:expired');
    }
    destroy() {
        this.subscriberClient.quit();
        this.schedQueueClient.quit();
        this.code = {};
    }

    removeCode(id) {
        delete this.code[id];
        const url = resolve(__dirname, '..', '..', 'checkcode', id + '.jpg');
        unlink(url, () => { });
    }

    async createCode(): Promise<any> {

        const { token, buffer } = await captcha();
        const id = guid();
        const file = id + '.jpg';
        const img = 'checkcode/' + file;
        const defer = new Defer();

        createWriteStream(img).on('finish', () => {
            const code = {
                src: file,
                code_id: id,
            };
            this.code[id] = token;
            // schedule ORDER_ID "remove_code" to expire in 60 seconds
            this.schedQueueClient.set(id, '', 'PX', 1000 * 60, redis.print);
            // this.schedQueueClient.quit();
            defer.resolve(code);
        }).end(buffer);

        return defer.promise;

    }
}

export default new Code();