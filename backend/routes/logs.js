import express from "express";
import fs from "fs";
import path from "path";
import logger from "../config/logger.js";

const router = express.Router();

router.get("/logs", (req, res) => {
  try {
    const { level, from } = req.query;
    const logPath = path.resolve("app.log");
    const logData = fs.readFileSync(logPath, "utf-8");

    const lines = logData
      .split("\n")
      .filter(Boolean)
      .map(line => {
        try { return JSON.parse(line); } catch { return null; }
      })
      .filter(l => l);

    let filtered = lines;
    if (level) filtered = filtered.filter(l => l.level === level);
    if (from) filtered = filtered.filter(l => new Date(l.timestamp) >= new Date(from));

    res.json({ status: "success", logs: filtered });
  } catch (err) {
    logger.error("Error fetchin g logs:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
});

export default router;
