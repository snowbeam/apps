/* eslint-disable import/no-unresolved */
import { Command, Flags } from "@oclif/core";
import { Server } from "server";
import { BaseCommand } from "src";
import { Container } from "typedi";

export default class Start extends BaseCommand {
  static description: string | undefined =
    "_Coming soon_";

  static examples: Command.Example[] = ["$ snowbeam start"];

  static flags = {
    help: Flags.help({ char: "h" }),
    open: Flags.boolean({
      char: "o",
      description: "Opens the UI automatically in the browser"
    })
  };

  protected server = Container.get(Server);

  async catch(error: Error) {
    console.log(error.stack);
  }

  async run(): Promise<void> {
    try {
      const { flags } = await this.parse(Start);

      console.log(flags);

    } catch (error: unknown) {
      console.log(error as Error);
    }
  }
}
