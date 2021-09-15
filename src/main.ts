import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    cookieSession({
      keys: ['asdfasdf'],
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Doesn't let data outside DTO be created
    }),
  );
  await app.listen(3000);
}
bootstrap();
