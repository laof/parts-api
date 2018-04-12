import { Get, Controller, Post, Body } from '@nestjs/common';
import * as marked from 'marked';
import { createWriteStream } from 'fs';
import * as captcha from 'trek-captcha';
import { Defer } from '../util/Defer';
import { guid } from '../util/guid';
import { UserService } from '../service/user.service';
import { User } from 'entity/User';
import { UserModel } from '../model/user';

@Controller('user')
export class UserController {
    @Post('login')
    code(@Body() body: UserModel) {
        const userService = new UserService();

        if (body.name !== '' && body.password !== '' && body.codeId !== '' && body.inputCode !== '') {
            return userService.login(body);
        } else {
            return { success: false, message: '确少必要的参数' };
        }

    }
    @Post('register')
    async username(): Promise<any> {
        return {};
    }
}
