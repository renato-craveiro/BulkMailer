/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Provides functions to fetch and display logs from the BulkMailer backend via CLI.
 */
import axios from "axios";
import { BASE_URL } from "../config.js";

/**
 * Fetches logs from the backend API and prints them to the console.
 * @param {string|null} level - Optional log level filter (error, warn, info).
 * @param {string|null} from - Optional date filter for logs.
 */
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

/**
 * Registers the 'logs' command in the CLI program.
 * When executed, calls getLog() to display logs.
 * @param {object} program - Commander program instance.
 */
export function logsCommand(program) {
  program.command("logs").action(() => getLog());
}
