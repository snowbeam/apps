import { Command } from "@oclif/core";
import "reflect-metadata";

/* The statement `export { run } from "@oclif/core";` is exporting the `run` function from the
`@oclif/core` module. This allows other modules or files to import and use the `run` function from
`@oclif/core`. */
export { run } from "@oclif/core";

/* The statement `export abstract class BaseCommand extends Command {}` is defining a new class called
`BaseCommand` that extends the `Command` class. The `BaseCommand` class is marked as `abstract`,
which means it cannot be instantiated directly but can only be used as a base class for other
classes. */
export abstract class BaseCommand extends Command {}
