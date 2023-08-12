import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './application/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api/');

  const options = new DocumentBuilder()
    .setTitle('API DOCS')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  app.use(urlencoded({ limit: '50mb', extended: false }));
  app.use(json({ limit: '50mb' }));

  await app.listen(AppModule.port);
}
bootstrap();
