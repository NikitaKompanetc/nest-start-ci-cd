import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port, () => {
    console.log('running on port: ', port);
  });
}
bootstrap();
