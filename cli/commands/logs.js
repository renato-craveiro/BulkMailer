import axios from "axios";
import { BASE_URL } from "../config.js";

export async function getLog(level = null, from = null) {
  try {
    const params = {};
    if (level) params.level = level;
    if (from) params.from = from;

    const res = await axios.get(`${BASE_URL}/logs`, { params });
    console.log("[Logs]\n", res.data.logs || res.data.message);
  } catch (err) {
    console.error("❌ Error fetching logs:", err.message);
  }
}

export function logsCommand(program) {
  program.command("logs").action(() => getLog());
}
