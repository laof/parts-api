import { Get, Controller, Post, Req, Param, Res, Body, Request } from '@nestjs/common';
import { createConnection } from 'typeorm';
import code from '../util/Code';
import { User } from '../entity/User';
import { UserService } from '../service/user.service';

@Controller('verification')
export class VerificationController {
    @Get('code')
    async code(@Request() request): Promise<any> {

        return code.createCode(request.sessionID);
    }
    @Post('username')
    async username(@Body() body: any): Promise<any> {

        const userService = new UserService();

        const response = await userService.rename(body.name);

        return { success: true, exist_name: response.length ? true : false };

    }
}
