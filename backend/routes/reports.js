/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Express route for fetching and filtering email sending reports.
 */
import express from "express";
import fs from "fs";
import path from "path";
import logger from "../config/logger.js";

const router = express.Router();

/**
 * GET /reports
 * Returns a list of report files, or the content of a specific report.
 * Supports filtering by date range and filename.
 */
router.get("/reports", (req, res) => {
  const { from, until, filename } = req.query;
  const dir = process.cwd();

  try {
    // If filename is provided, return the content of that report file
    if (filename) {
      const filePath = path.join(dir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }
      const message = fs.readFileSync(filePath, "utf-8");
      return res.json({ status: "success", filename, message });
    }

    // Get all report files matching the naming pattern
    let files = fs.readdirSync(dir).filter(f => f.startsWith("email_report_") && f.endsWith(".txt"));

    // Filter report files by date range if provided
    if (from || until) {
      const fromDate = from ? new Date(from) : null;
      const untilDate = until ? new Date(until) : null;
      files = files.filter(f => {
        const ts = Number(f.match(/email_report_(\d+)\.txt/)?.[1]);
        const date = new Date(ts);
        return (!fromDate || date >= fromDate) && (!untilDate || date <= untilDate);
      });
    }

    // Return the list of filtered report files
    res.json({ status: "success", message: files });
  } catch (err) {
    logger.error("Error on reports:", err);
    res.status(500).json({ status: "error", message: "Internal error" });
  }
});

// Export the router for use in the main app
export default router;
