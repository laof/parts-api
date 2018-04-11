import { Get, Controller, Post } from '@nestjs/common';
import * as marked from 'marked';
import { createWriteStream } from 'fs';
import * as captcha from 'trek-captcha';
import { Defer } from '../util/Defer';
import { guid } from '../util/guid';

@Controller('verification')
export class Verification {
    @Get('code')
    async code(): Promise<any> {
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
            defer.resolve(code);
        }).end(buffer);

        return defer.promise;
    }
    @Post('test')
    async username(): Promise<any> {

    }
}
