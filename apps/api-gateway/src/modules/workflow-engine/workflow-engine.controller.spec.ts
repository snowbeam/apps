import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowEngineController } from "./workflow-engine.controller";

describe("WorkflowEngineController", () => {
  let controller: WorkflowEngineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowEngineController]
    }).compile();

    controller = module.get<WorkflowEngineController>(WorkflowEngineController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
