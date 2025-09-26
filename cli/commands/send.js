import fs from "fs";
import axios from "axios";
import { BASE_URL } from "../config.js";

export async function sendEmails(file, template, subject) {
  const table_data = fs.readFileSync(file, "utf-8");
  const templateContent = fs.readFileSync(template, "utf-8");


  const res = await axios.post(`${BASE_URL}/send-emails`, {
    table_data,
    template: templateContent,
    subject,
  });
  

  console.log("✅ Success:", res.data);
}

export function sendCommand(program) {
  program
    .command("send")
    .requiredOption("-f, --file <path>")
    .requiredOption("-t, --template <path>")
    .option("-s, --subject <text>", "No subject")
    .action(opts => sendEmails(opts.file, opts.template, opts.subject));
}
