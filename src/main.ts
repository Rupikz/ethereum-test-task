import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigurationService } from './shared/configuration.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configurationService = app.get(ConfigurationService);
  const port = configurationService.port;

  app.setGlobalPrefix('api/v1.0');
  const options = new DocumentBuilder()
    .setTitle('Ethereum API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(port);
  console.info(`🚀 Api documentation on http://localhost:${port}/api`);
}
bootstrap();
