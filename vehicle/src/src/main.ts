import { Module, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não definidas no DTO
    forbidNonWhitelisted: true, // Lança exceções se propriedades não definidas no DTO forem encontradas
    transform: true, // Transforma tipos de dados conforme necessário
  }));
  await app.listen(2187);
}
bootstrap();
