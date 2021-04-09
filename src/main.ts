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

  console.log(' quye saaleee: ', process.env.NODE_ENV, process.env.PORT);
  app.enableCors({
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? [
            'https://martket-ts-nestjs.vercel.app',
            'https://react-ts-market.herokuapp.com',
            'http://localhost:5000',
          ]
        : 'http://localhost:3001',
  });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
