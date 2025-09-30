#!/usr/bin/env node

/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: BulkMailer CLI entry point. Provides commands for sending emails, viewing reports, and checking logs.
 */


// BulkMailer CLI entry point
// Provides commands for sending emails, viewing reports, and checking logs.
// If no arguments are provided, launches an interactive prompt.
import { program } from "commander";
import { sendCommand } from "./commands/send.js";
import { reportsCommand } from "./commands/reports.js";
import { logsCommand } from "./commands/logs.js";
import { interactiveLoop } from "./interactive.js";

/**
 * Main function for CLI execution.
 * - Launches interactive mode if no arguments are provided.
 * - Registers CLI commands for sending emails, viewing reports, and logs.
 * - Parses command-line arguments asynchronously.
 */
async function main() {

    if (process.argv.length <= 2) {
        await interactiveLoop();
      }

  program.name("mailer-cli").description("CLI for BulkMailer. Sends emails with specified parameters and checks server logs and reports.").version("0.0.1");

  sendCommand(program);
  reportsCommand(program);
  logsCommand(program);

  await program.parseAsync(process.argv);

  
}

// Run the main function and handle any errors
main().catch(err => {
  console.error(err);
  process.exit(1);
});