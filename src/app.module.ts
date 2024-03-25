import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import * as cors from 'cors';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  // LoggerMiddleware,
  logger,
} from './common/middlewares/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    AppService,
    CatsService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
    consumer;
  }
}
