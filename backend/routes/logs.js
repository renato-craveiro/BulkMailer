/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Express route for fetching and filtering application logs.
 */
import express from "express";
import fs from "fs";
import path from "path";
import logger from "../config/logger.js";

const router = express.Router();

/**
 * GET /logs
 * Returns filtered log entries from app.log as JSON.
 * Supports filtering by log level and date.
 */
router.get("/logs", (req, res) => {
  try {
    const { level, from } = req.query;
    const logPath = path.resolve("app.log");
    const logData = fs.readFileSync(logPath, "utf-8");

    // Parse log file lines as JSON objects
    const lines = logData
      .split("\n")
      .filter(Boolean)
      .map(line => {
        try { return JSON.parse(line); } catch { return null; }
      })
      .filter(l => l);

    // Filter logs by level and date if provided
    let filtered = lines;
    if (level) filtered = filtered.filter(l => l.level === level);
    if (from) filtered = filtered.filter(l => new Date(l.timestamp) >= new Date(from));

    // Return filtered logs as JSON
    res.json({ status: "success", logs: filtered });
  } catch (err) {
    logger.error("Error fetchin g logs:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Export the router for use in the main app
export default router;
