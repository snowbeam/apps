/* eslint-disable unicorn/filename-case */
/* eslint-disable import/no-unresolved */
import { Flags } from "@oclif/core";
import { BaseCommand } from "src";

/* The `ListWorkflowCommand` class is a TypeScript class that lists workflows based on their active
status and outputs their IDs and names. */
export default class ListWorkflowCommand extends BaseCommand {
  static description = "List workflows";

  static examples = [
    "$ snowbeam list:workflow",
    "$ snowbeam list:workflow --active=true --onlyId",
    "$ snowbeam list:workflow --active=false"
  ];

  static flags = {
    active: Flags.string({
      default: "true",
      description: "Filter workflows by active status. Can be true or false",
      name: "active"
    }),
    help: Flags.help({ char: "h" }),
    onlyId: Flags.boolean({
      description: "Outputs workflow IDs only, one per line"
    })
  };

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(ListWorkflowCommand);
      const { active, onlyId } = flags;

      if (active !== undefined && !["false", "true"].includes(active)) {
        this.error("The --active flag has to be passed using true or false");
      }

      const workflowRepository: Array<{ id: string; name: string }> = [
        { id: "mrvjhb", name: "Invoice Mapper" },
        { id: "mrvjhb", name: "Invoice Mapper" },
        { id: "mrvjhb", name: "Invoice Mapper" }
      ];

      const workflows =
        active === undefined ? workflowRepository : workflowRepository;

      if (onlyId) {
        for (const workflow of workflows) console.log(workflow.id);
      } else {
        for (const workflow of workflows)
          console.log(`${workflow.id}|${workflow.name}`);
      }
    } catch (error: unknown) {
      console.log(error as Error);
    }
  }
}
