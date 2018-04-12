import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VerificationController } from './controller/verification';
import { UserController } from './controller/user';

@Module({
  imports: [],
  controllers: [AppController, VerificationController, UserController],
  components: [],
})
export class AppModule { }
