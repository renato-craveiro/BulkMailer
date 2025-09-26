import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const isPkg = typeof process.pkg !== "undefined";
const basePath = isPkg
  ? path.dirname(process.execPath) // caminho do exe
  : process.cwd();                // caminho da execução do script

const envPath = path.join(basePath, ".env");

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  console.warn(".env not found, using defaults");
}

export const BASE_URL = process.env.API_BASE_URL || "http://localhost";
