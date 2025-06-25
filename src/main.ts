import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start(): Promise<void> {
  const application: INestApplication = await NestFactory.create(MainModule);

  SwaggerModule.setup(
    '/docs',
    application,
    SwaggerModule.createDocument(
      application,
      new DocumentBuilder().setTitle('Poker API').build(),
    ),
  );

  application.useGlobalPipes(new ValidationPipe({ transform: true }));

  await application.listen(process.env.PORT ?? 3000);
}

void start();
