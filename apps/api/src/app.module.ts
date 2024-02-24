import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { AppController } from "src/app.controller";
import { AppService } from "src/app.service";
import { FastifyLoggerMiddleware } from "src/middlewares/logger/fastifylogger.middleware";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FastifyLoggerMiddleware)
      .forRoutes({ path: "(.*)", method: RequestMethod.ALL });
  }
}
