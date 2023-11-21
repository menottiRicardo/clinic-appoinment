import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

function configureSwagger(app): void {
  const config = new DocumentBuilder()
    .setTitle('appointmet-service')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/appt/api/docs', app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.setGlobalPrefix('appt');

  configureSwagger(app);

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
  console.log(
    '🚀 APPOINTMENT Service running on port: ' + configService.get('PORT'),
  );
}
bootstrap();
