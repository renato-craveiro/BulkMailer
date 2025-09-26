import axios from "axios";
import inquirer from "inquirer";
import { formatDate, extractTimestamp } from "../utils.js";
import { BASE_URL } from "../config.js";

export async function chooseReport(files) {
  if (!files.length) {
    console.log("❌ No report found.");
    return;
  }

  const choices = files.map(f => {
    const ts = extractTimestamp(f);
    return { name: `${f} → ${formatDate(ts)}`, value: f };
  });

  const { selected } = await inquirer.prompt({
    type: "list",
    name: "selected",
    message: "Choose the report:",
    choices,
  });
  
  const res = await axios.get(`${BASE_URL}/reports`, { params: { filename: selected } });

  console.log(`\n=== Conteúdo de ${selected} ===\n`);
  console.log(res.data.message);
}

export async function getCmdReports(params) {
  const start = params.from;
  const end = params.until;
  const report = params.report
  var listFlag=false;
  var res;
  if(start || end){
    res = await axios.get(`${BASE_URL}/reports`, { params:{ from: start, until: end}});
    listFlag=true;
  }else if(report){
    res = await axios.get(`${BASE_URL}/reports`, { params:{ filename: report} });
    listFlag = false;
  }else{
    res = await axios.get(`${BASE_URL}/reports`);
    listFlag=true;
  }
  if(listFlag){
    const files = res.data.message.map(f => {
      const ts = extractTimestamp(f);
      return { name: `${f} → ${formatDate(ts)}`, value: f };
    });
    
    console.log(files);
  }else{
    console.log(res.data.message);
  }
}

export async function getReports() {
  const { action } = await inquirer.prompt({
    type: "list",
    name: "action",
    message: "[Reports] Choose an option?",
    choices: ["All reports", "Filter by dates", "Quit"],
  });

  if (action === "All reports") {
    const res = await axios.get(`${BASE_URL}/reports`);
    console.log("[Reports]");
    await chooseReport(res.data.message);
  }

  if (action === "Filter by dates") {
    const { from, until } = await inquirer.prompt([
      { type: "input", name: "from", message: "Initial date (YYYY-MM-DD, empty to ignore):", default: "" },
      { type: "input", name: "until", message: "Final date (YYYY-MM-DD, empty to ignore):", default: "" },
    ]);

    const params = {};
    if (from) params.from = from;
    if (until) params.until = until;

    const res = await axios.get(`${BASE_URL}/reports`, { params });
    console.log("[Reports] Filtered results:");
    await chooseReport(res.data.message);
  }
}

export function reportsCommand(program) {
  program
  .command("reports")
  .option("-f, --from <text>", "Initial filter (YYYY-MM-DD)")
  .option("-u, --until <text>", "Final filter (YYYY-MM-DD)")
  .option("-r, --report <text>", "Opens the specified report")
  .action(opts => {
    // validação de exclusividade
    if (opts.report && (opts.from || opts.until)) {
      console.error("❌ Invalid option: do not use -r alongside -f or -u.");
      process.exit(1);
    }
    return getCmdReports(opts);
  });
}
