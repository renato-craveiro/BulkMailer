/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Utility functions for BulkMailer CLI. Includes file validation, date formatting, and timestamp extraction.
 */
import fs from "fs";

/**
 * Validates if a file exists.
 * Returns true if the file exists, or an error message if it does not.
 * @param {string} input - Path to the file to check.
 * @returns {true|string} True if file exists, error message otherwise.
 */
export function validateFileExists(input) {
  return fs.existsSync(input) ? true : "File not Found";
}

/**
 * Formats a timestamp or number into a readable UK date string.
 * @param {number|string} ts - Timestamp or number to format.
 * @returns {string} Formatted date string.
 */
export function formatDate(ts) {
  const date = new Date(ts);
  return date.toLocaleString("en-UK");
}

/**
 * Extracts a timestamp from a filename, returning only the numeric part.
 * @param {string} filename - Filename containing a timestamp.
 * @returns {number} Extracted timestamp as a number.
 */
export function extractTimestamp(filename) {
  return Number(filename.replace(/\D/g, ""));
}
