/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Utility functions for handling form input, file uploads, and state updates in BulkMailer frontend.
 */

/**
 * Handles HTML template file upload and updates form state.
 * @param {function} setForm - State setter for form data.
 * @returns {function} Event handler for file input.
 */
export const handleHtmlFile = (setForm) => async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => setForm((f) => ({ ...f, template: ev.target.result }));
  reader.readAsText(file, "windows-1252");
};

/**
 * Handles CSV data file upload, normalizes line breaks, and updates form state.
 * @param {function} setForm - State setter for form data.
 * @returns {function} Event handler for file input.
 */
export const handleCSVFile = (setForm) => async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result.replace(/\r\n|\r/g, "\n"); // normalize line breaks
    setForm((f) => ({ ...f, table_data: text }));
  };
  reader.readAsText(file, "windows-1252");
};

/**
 * Handles generic form field changes and updates form state.
 * @param {function} setForm - State setter for form data.
 * @returns {function} Event handler for input change.
 */
export const handleChange = (setForm) => (e) => {
  setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
};