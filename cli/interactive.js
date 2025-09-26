import inquirer from "inquirer";
//import { ExitPromptError } from "@inquirer/core";
import { validateFileExists } from "./utils.js";
import { sendEmails } from "./commands/send.js";
import { getReports } from "./commands/reports.js";
import { getLog } from "./commands/logs.js";

process.on("SIGINT", () => {
  console.log("\n❌ User Interrupted (Ctrl+C). Quitting...");
  process.exit(0);
});

export async function interactiveLoop() {
  while (true) {
    try {
      const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "Choose an option:",
        choices: ["Send new batch", "Check reports", "Check logs", "Quit"],
      });

      if (action === "Quit") break;

      if (action === "Send new batch") {
        const answers = await inquirer.prompt([
          { type: "input", name: "file", message: "Data file (.csv) source:", validate: validateFileExists },
          { type: "input", name: "template", message: "HTML file source:", validate: validateFileExists },
          { type: "input", name: "subject", message: "Email subject:", default: "No subject" },
        ]);
        await sendEmails(answers.file, answers.template, answers.subject);
      }

      if (action === "Check reports") await getReports();

      if (action === "Check logs") {
        const answers = await inquirer.prompt([
          { type: "input", name: "level", message: "Log Level (error, warn, info):", default: "" },
          { type: "input", name: "date", message: "Logs since:", default: "" },
        ]);
        await getLog(answers.level || null, answers.date || null);
      }

    } catch (err) {
      console.error("❌ Unexpected error:", err);
      process.exit(1);
    }
  }
}
