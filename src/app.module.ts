import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Verification } from './controller/verification';

@Module({
  imports: [],
  controllers: [AppController, Verification],
  components: [],
})
export class AppModule { }
