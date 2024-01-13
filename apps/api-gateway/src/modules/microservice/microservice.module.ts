// src/microservice.module.ts
import { Module } from "@nestjs/common";
import { MicroserviceController } from "./microservice.controller";
import { MicroserviceService } from "./microservice.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { join } from "path";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: "MICROSERVICE_PACKAGE",
        transport: Transport.GRPC,
        options: {
          package: "microservice",
          protoPath: join(__dirname, "microservice.proto")
        }
      }
    ])
  ],
  controllers: [MicroserviceController],
  providers: [MicroserviceService]
})
export class MicroserviceModule {}
