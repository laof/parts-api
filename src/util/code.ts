import * as  redis from 'redis';
import * as captcha from 'trek-captcha';
import { guid } from './guid';
import { Defer } from './Defer';
import { createWriteStream, unlink } from 'fs';
import { resolve } from 'path';

interface QueueMessage {
    file: string;
    sessionID: string;
}
interface CodeCache {
    file: string;
    token: string;
}

class Code {
    private code: { [key: string]: CodeCache } = { FDAE456AFDA546A: { file: 'test.jpg', token: 'ab3d' } };
    private subscriberClient = redis.createClient();
    private schedQueueClient = redis.createClient();
    constructor() {

        this.subscriberClient.on('pmessage', (pattern, channel, obj) => {
            this.removeCode(JSON.parse(obj) as QueueMessage);
            // TODO: push expiredKey onto some other list to proceed to order fulfillment
        });
        // subscribe to key expire events on database 0
        this.subscriberClient.psubscribe('__keyevent@0__:expired');
    }
    contrast(sessionID: string, code: string): boolean {
        let outputCode = '';
        const cacheCode = this.code[sessionID];
        if (cacheCode) {
            outputCode = cacheCode.token.toLowerCase();
            // 所有条件满足时，不管是否填写正确，都只能验证一次。
            const queueMessage: QueueMessage = { file: cacheCode.file, sessionID };
            this.removeCode(queueMessage);
        }
        const inputCode = code.toLowerCase();

        return outputCode === inputCode;
    }
    destroy() {
        this.subscriberClient.quit();
        this.schedQueueClient.quit();
        this.code = {};
    }

    removeCode(obj: QueueMessage): any {

        const oldCode = this.code[obj.sessionID];

        if (oldCode && oldCode.file === obj.file) {
            delete this.code[obj.sessionID];
        }

        const url = resolve(__dirname, '..', '..', 'checkcode', obj.file);
        unlink(url, () => { });
    }

    async createCode(sessionID: string): Promise<any> {
        const { token, buffer } = await captcha();
        const file = guid() + '.jpg';
        const img = 'checkcode/' + file;
        const defer = new Defer();

        createWriteStream(img).on('finish', () => {
            const code = {
                src: file,
            };
            this.code[sessionID] = {
                token,
                file,
            };
            // schedule ORDER_ID "remove_code" to expire in 60 seconds

            const data = {
                file,
                sessionID,
            } as QueueMessage;

            this.schedQueueClient.set(JSON.stringify(data), '', 'PX', 1000 * 60, redis.print);
            // this.schedQueueClient.quit();
            defer.resolve(code);
        }).end(buffer);

        return defer.promise;

    }
}

export default new Code();