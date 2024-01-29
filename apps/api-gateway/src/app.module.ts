import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
  ValidationError
} from "@nestjs/common";
import { APP_FILTER, APP_PIPE } from "@nestjs/core";
import {
  AllExceptionsFilter,
  ValidationExceptionFilter,
  BadRequestExceptionFilter,
  UnauthorizedExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter
} from "src/core/filters";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FastifyLoggerMiddleware } from "./middlewares/logger/fastifylogger.middleware";
// import { AuthModule } from "./modules/auth/auth.module";
// import { MicroserviceModule } from "./modules/microservice/microservice.module";
// import { WorkflowEngineModule } from "./modules/workflow-engine/workflow-engine.module";
import { NestDrizzleModule } from "./modules/drizzle/drizzle.module";
import * as schema from "../.drizzle/migration/schema";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    NestDrizzleModule.forRootAsync({
      useFactory: () => {
        return {
          driver: "postgres-js",
          url: process.env.DATABASE_URL,
          options: { schema: schema },
          migrationOptions: { migrationsFolder: ".drizzle/migrations" }
        };
      }
    })
    // AuthModule,
    // MicroserviceModule,
    // WorkflowEngineModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    { provide: APP_FILTER, useClass: BadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: UnauthorizedExceptionFilter },
    { provide: APP_FILTER, useClass: ForbiddenExceptionFilter },
    { provide: APP_FILTER, useClass: NotFoundExceptionFilter },
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          }
        })
    }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FastifyLoggerMiddleware)
      .forRoutes({ path: "(.*)", method: RequestMethod.ALL });
  }
}
