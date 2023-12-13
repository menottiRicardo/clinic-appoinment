import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle('appointment-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/appt/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser());
  configureSwagger(app);

  console.log(configService.get('RABBITMQ_URL'));
  await app.listen(configService.get('PORT'));
  console.log(
    '🚀 APPOINTMENT Service running on port: ' + configService.get('PORT'),
  );
}
bootstrap();
