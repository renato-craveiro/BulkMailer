/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Utility helper functions for BulkMailer backend.
 */

/**
 * Escapes special characters in a string for use in a regular expression.
 * @param {string} s - The string to escape.
 * @returns {string} The escaped string.
 */
export const escapeRegExp = (s) =>
  s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Replaces placeholders like {0}, {1}, ... in a string with corresponding values from an array.
 * @param {string} str - The string containing placeholders.
 * @param {string[]} values - Array of values to insert.
 * @returns {string} The formatted string.
 */
export const applyPlaceholders = (str, values) =>
  values.reduce((acc, val, idx) => acc.replaceAll(`{${idx}}`, val.trim()), str);