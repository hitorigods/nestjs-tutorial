import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import * as cors from 'cors';
import helmet from 'helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  // LoggerMiddleware,
  logger,
} from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
    consumer;
  }
}
