import { Module } from "@nestjs/common";
import { WorkflowEngineController } from "./workflow-engine.controller";
import { WorkflowEngineService } from "./workflow-engine.service";

@Module({
  controllers: [WorkflowEngineController],
  providers: [WorkflowEngineService]
})
export class WorkflowEngineModule {}
