import { Get, Controller, Post, Req, Param, Res, Body } from '@nestjs/common';
import { createConnection } from 'typeorm';
import * as marked from 'marked';
import { createWriteStream } from 'fs';
import * as captcha from 'trek-captcha';
import { Defer } from '../util/Defer';
import { guid } from '../util/guid';
import { User } from '../entity/User';

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
    @Post('username')
    async username(@Body() body: any): Promise<any> {
        return createConnection().then(async connection => {
            const userRepository = connection.getRepository(User);
            const res = await userRepository.find({ where: { name: body.name } });
            connection.close();
            return { success: true, exist_name: res.length ? true : false };
        });
    }
}
