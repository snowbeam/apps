import { Command } from "@oclif/command";
import "reflect-metadata";
import { Container } from "typedi";

export abstract class BaseCommand extends Command {
  protected logger = Container();
}
