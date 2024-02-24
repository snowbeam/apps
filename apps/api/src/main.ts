import { VersioningType } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication
} from "@nestjs/platform-fastify";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from "src/app.module";

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
    .addServer("http://localhost:8000")
    .addSecurity("basic", {
      type: "http",
      scheme: "basic"
    })
    .addApiKey({ name: "Snowbeam API Key", type: "apiKey" })
    .addOAuth2({
      name: "Snowbeam OAuth",
      type: "oauth2",
      flows: {
        implicit: {
          authorizationUrl: 'https://petstore3.swagger.io/oauth/authorize',
          scopes: {
            'write:pets': 'modify pets in your account',
            'read:pets': 'read your pets'
          }
        }
      }
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("snowbeam/api/swagger-docs", app, document);

  await app.listen(configService.get("PORT"));
}

bootstrap();
