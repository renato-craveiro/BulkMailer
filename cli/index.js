#!/usr/bin/env node
import { program } from "commander";
import { sendCommand } from "./commands/send.js";
import { reportsCommand } from "./commands/reports.js";
import { logsCommand } from "./commands/logs.js";
import { interactiveLoop } from "./interactive.js";

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

main().catch(err => {
  console.error(err);
  process.exit(1);
});