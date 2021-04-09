import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.use(helmet());
  // Para validar globalmente el class vlaidator en los DTO
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://react-market-front.herokuapp.com/'
        : 'http://localhost:3001',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
