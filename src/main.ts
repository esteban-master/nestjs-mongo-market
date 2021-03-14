import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Para validar globalmente el class vlaidator en los DTO
  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3001',
  });

  app.use(cookieParser());
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
