#!/usr/bin/env node
/* eslint-disable func-names */
/* eslint-disable unicorn/prefer-top-level-await */

/**
 * This function is the entry point of the application. It initializes the Oclif framework and executes the command specified by the user.
 * @param {boolean} development - Indicates whether the application is running in development mode or not.
 * @param {string} dir - The directory where the application is located.
 */
(async function snowbeamCliexecute(development, dir) {
  // Import the Oclif framework
  const {execute} = await import('@oclif/core');

  // Initialize the Oclif framework
  await execute({
    argv: process.argv.slice(2),
    dev: development,
    dir
  });

})(false, import.meta.url); // production
