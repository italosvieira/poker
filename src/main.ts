import { NestFactory } from '@nestjs/core';
import { MainModule } from './main.module';
import { INestApplication } from '@nestjs/common';

async function start(): Promise<void> {
  const application: INestApplication = await NestFactory.create(MainModule);
  await application.listen(process.env.PORT ?? 3000);
}

void start();
