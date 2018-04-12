import { Get, Controller, Post } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { Photo } from './entity/Photo';
import * as marked from 'marked';
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  @Get()
  root(): string {
    const markstr = readFileSync('api.md').toString();
    const apiHtml = marked(markstr);
    return apiHtml;
  }
  @Post('test')
  async getList(): Promise<any> {
    const connection = await createConnection();
    const photoRepository = connection.getRepository(Photo);
    const column = await photoRepository.find();
    connection.close();
    return column;
  }
}
