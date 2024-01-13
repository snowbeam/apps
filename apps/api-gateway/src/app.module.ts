import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FastifyLoggerMiddleware } from "./middlewares/logger/fastifylogger.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { MicroserviceModule } from "./modules/microservice/microservice.module";
import { WorkflowEngineModule } from "./modules/workflow-engine/workflow-engine.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    AuthModule,
    MicroserviceModule,
    WorkflowEngineModule
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
