import { User } from '../entity/User';
import { createConnection } from 'typeorm';
import codeService from '../util/Code';
import { UserModel } from 'model/user';

export class UserService {
    /**
     * 是否重名
     *
     * @param {string} name
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async rename(name: string): Promise<any> {

        const connection = await createConnection();
        const userRepository = connection.getRepository(User);
        const res = await userRepository.find({ where: { name } });
        connection.close();
        return res;
    }

    /**
     * 注册新用户
     *
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async add(user: User): Promise<any> {
        const existName = await this.rename(user.name);

        if (existName.length) {
            return { success: true, login: false, message: 'find exist Name :' + user.name };
        }
        const connection = await createConnection();
        const userRepository = connection.getRepository(User);
        const res = await userRepository.find({ where: { name } });
        connection.close();
        return res;
    }

    /**
     * 登录
     *
     * @returns {Promise<any>}
     * @memberof UserService
     */
    async login(user: UserModel, sessionID: string): Promise<any> {
        const contrast = codeService.contrast(sessionID, user.inputCode);

        if (contrast) {
            const connection = await createConnection();
            const userRepository = connection.getRepository(User);
            const res = await userRepository.find({ where: { name: user.name, password: user.password } });
            connection.close();
            return { success: true, login: res.length === 1 };
        } else {
            return { success: true, login: '验证码错误' };
        }

    }
}