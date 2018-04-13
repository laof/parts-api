import { Get, Controller, Post, Response } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { Photo } from './entity/Photo';
import * as marked from 'marked';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { renderFile } from 'ejs';
@Controller()
export class AppController {
  @Get()
  root(@Response() response) {
    const markdown = readFileSync('api.md').toString();
    return response.render('index', { markdown: marked(markdown) });
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
