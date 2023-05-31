import { NestFactory} from '@nestjs/core';
import { ApiTags, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Education API')
    .setVersion('1.0')
    .build();
  ApiTags("Work")
  const document = SwaggerModule.createDocument(app, config);
  const port = app.get(ConfigService).get('port')
  app.useGlobalPipes(new ValidationPipe())
  SwaggerModule.setup('api_docs', app, document);
  await app.listen(port, () => {
    console.log(`server run on port ${port}`)
  });
  await app.setGlobalPrefix('/api');
}
bootstrap();
