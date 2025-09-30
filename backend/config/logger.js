/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Winston logger configuration for BulkMailer backend. Logs to console and app.log file.
 */
import winston from "winston";

// Create a Winston logger instance with info level and JSON formatting
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log to app.log file
    new winston.transports.File({ filename: "app.log" })
  ]
});

// Export the logger for use in other modules
export default logger;
