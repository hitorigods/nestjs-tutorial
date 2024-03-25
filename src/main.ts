import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/middlewares/logger.middleware';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { AllExceptionsFilter } from './common/exceptions/all-exceptions.filter';
import { ValidationPipe } from './common/schemas/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.use(logger);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
