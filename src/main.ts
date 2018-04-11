import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import './sql.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3999);
}
bootstrap();
