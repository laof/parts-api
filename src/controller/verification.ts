import { Get, Controller, Post, Req, Param, Res, Body } from '@nestjs/common';
import { createConnection } from 'typeorm';
import code from '../util/Code';
import { User } from '../entity/User';

@Controller('verification')
export class Verification {
    @Get('code')
    async code(): Promise<any> {
        return code.createCode();
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
