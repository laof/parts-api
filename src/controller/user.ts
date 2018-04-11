import { Get, Controller, Post } from '@nestjs/common';
import * as marked from 'marked';
import { createWriteStream } from 'fs';
import * as captcha from 'trek-captcha';
import { Defer } from '../util/Defer';
import { guid } from '../util/guid';

@Controller('user')
export class Verification {
    @Post('login')
    code() {
        return {};
    }
    @Post('register')
    async username(): Promise<any> {
        return {};
    }
}
