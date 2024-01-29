import { VersioningType } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { ConfigService } from "@nestjs/config";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: { enabled: true, level: "info" } }),
    { forceCloseConnections: false }
  );

  const configService: ConfigService = app.get(ConfigService);

  app.enableCors({
    origin: process.env.SNOWBEAM_WEB_APP
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: "v",
    defaultVersion: "0"
  });

  const config = new DocumentBuilder()
    .setTitle("Snowbeam REST API")
    .setDescription("The Snwobeam API description")
    .setVersion("1.0")
    .addTag("snowbeam")
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("api", app, document);

  await app.listen(configService.get("PORT"));
}

bootstrap();
