import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { resolve } from 'path';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

import * as cors from 'cors';

import { exec } from 'child_process';

async function bootstrap() {
  const port = 18080;
  const app = await NestFactory.create(AppModule);
  app.set('views', resolve(__dirname, '..', 'webapp'));
  app.set('view engine', 'ejs');

  app.use(cors());
  app.use(cookieParser());
  app.use(session({
    secret: '12345',
    name: 'lovaApp',   // 这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: { maxAge: 1000 * 60 * 30 },  // 设置maxAge是30分钟后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
  }));
  app.use(express.static('checkcode'));
  app.use(express.static('webapp'));
  await app.listen(port);
  exec('start http://127.0.0.1:' + port);
}
bootstrap();
