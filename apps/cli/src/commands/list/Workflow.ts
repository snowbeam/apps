import { flags } from "@oclif/command";
import { type IBooleanFlag } from "@oclif/parser/lib/flags";

import { BaseCommand } from "../BaseCommand";

export default class ListWorkflowCommand extends BaseCommand {
  static description = "\nList workflows";

  static examples = [
    "$ snowbeam list:workflow",
    "$ snowbeam list:workflow --active=true --onlyId",
    "$ snowbeam list:workflow --active=false"
  ];

  static flags: {
    active: flags.IOptionFlag<string>;
    help: IBooleanFlag<void>;
    onlyId: IBooleanFlag<boolean>;
  } = {
    active: flags.string({
      default: "true",
      description: "Filter workflows by active status. Can be true or false",
      name: "active"
    }),
    help: flags.help({ char: "h" }),
    onlyId: flags.boolean({
      description: "Outputs workflow IDs only, one per line"
    })
  };

  async run() {
    const { flags } = this.parse(ListWorkflowCommand);

    if (
      flags.active !== undefined &&
      !["false", "true"].includes(flags.active)
    ) {
      this.error("The --active flag has to be passed using true or false");
    }

    const workflowRepository: Array<{id: string; name: string;}> = [{id: '', name: ''}];

    const workflows = flags.active === undefined ? workflowRepository : workflowRepository;

    if (flags.onlyId) {
      for (const workflow of workflows) this.logger.info(workflow.id);
    } else {
      for (const workflow of workflows) this.logger.info(`${workflow.id}|${workflow.name}`)
    }
  }
}
