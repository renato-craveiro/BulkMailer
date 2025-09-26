import express from "express";
import fs from "fs";
import path from "path";
import logger from "../config/logger.js";

const router = express.Router();

router.get("/reports", (req, res) => {
  const { from, until, filename } = req.query;
  const dir = process.cwd();

  try {
    if (filename) {
      const filePath = path.join(dir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ status: "error", message: "File not found" });
      }
      const message = fs.readFileSync(filePath, "utf-8");
      return res.json({ status: "success", filename, message });
    }

    let files = fs.readdirSync(dir).filter(f => f.startsWith("email_report_") && f.endsWith(".txt"));

    if (from || until) {
      const fromDate = from ? new Date(from) : null;
      const untilDate = until ? new Date(until) : null;
      files = files.filter(f => {
        const ts = Number(f.match(/email_report_(\d+)\.txt/)?.[1]);
        const date = new Date(ts);
        return (!fromDate || date >= fromDate) && (!untilDate || date <= untilDate);
      });
    }

    res.json({ status: "success", message: files });
  } catch (err) {
    logger.error("Error on reports:", err);
    res.status(500).json({ status: "error", message: "Internal error" });
  }
});

export default router;
