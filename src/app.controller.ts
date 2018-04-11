import { Get, Controller, Post } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { Photo } from 'entity/Photo';
@Controller()
export class AppController {
  @Get()
  root(): string {
    return '18080 : Hello World ';
  }
  @Post('test')
  async getList(): Promise<any> {
    return createConnection().then(async connection => {
      const photoRepository = connection.getRepository(Photo);
      const a = await photoRepository.find();
      connection.close();
      return a;
    });
  }
}
