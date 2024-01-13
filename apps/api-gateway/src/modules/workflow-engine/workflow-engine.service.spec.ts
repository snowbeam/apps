import { Test, TestingModule } from "@nestjs/testing";
import { WorkflowEngineService } from "./workflow-engine.service";

describe("WorkflowEngineService", () => {
  let service: WorkflowEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkflowEngineService]
    }).compile();

    service = module.get<WorkflowEngineService>(WorkflowEngineService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
