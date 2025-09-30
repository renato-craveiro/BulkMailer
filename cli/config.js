/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Loads environment variables and sets configuration for BulkMailer CLI.
 */
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Determine if running as a packaged executable (using pkg) or as a script
const isPkg = typeof process.pkg !== "undefined";
const basePath = isPkg
  ? path.dirname(process.execPath) // path to the executable
  : process.cwd();                // path to the script execution

// Build path to .env file
const envPath = path.join(basePath, ".env");

// Load environment variables from .env if available
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(".env not found, using defaults");
}

// Set the base API URL from environment or use default
export const BASE_URL = process.env.API_BASE_URL || "http://localhost";
