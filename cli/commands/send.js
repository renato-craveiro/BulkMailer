import fs from "fs";
/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Provides CLI functions to send emails using BulkMailer backend.
 */
import axios from "axios";
import { BASE_URL } from "../config.js";

export async function sendEmails(file, template, subject) {
/**
 * Reads data and template files, then sends an email batch via the backend API.
 * @param {string} file - Path to the CSV data file.
 * @param {string} template - Path to the HTML template file.
 * @param {string} subject - Subject line for the email.
 */
  const table_data = fs.readFileSync(file, "utf-8");
  const templateContent = fs.readFileSync(template, "utf-8");


  const res = await axios.post(`${BASE_URL}/send-emails`, {
    table_data,
    template: templateContent,
    subject,
  });
  
  // Print the result of the email sending operation

  console.log("✅ Success:", res.data);
}
/**
 * Registers the 'send' command in the CLI program.
 * Requires file and template options, and allows an optional subject.
 * @param {object} program - Commander program instance.
 */

export function sendCommand(program) {
  program
    .command("send")
    .requiredOption("-f, --file <path>")
    .requiredOption("-t, --template <path>")
    .option("-s, --subject <text>", "No subject")
    .action(opts => sendEmails(opts.file, opts.template, opts.subject));
}
