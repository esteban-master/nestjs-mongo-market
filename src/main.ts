import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para validar globalmente el class vlaidator en los DTO
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
