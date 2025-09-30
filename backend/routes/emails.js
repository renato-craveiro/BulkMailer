/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Express route for handling bulk email sending, including attachments and reporting.
 */

import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import transporter from "../config/mailer.js";
import logger from "../config/logger.js";
import { escapeRegExp, applyPlaceholders } from "../utils/helpers.js";

const router = express.Router();
// Configure multer for file uploads (images)
const upload = multer({ dest: "uploads/" });

/**
 * POST /send-emails
 * Handles bulk email sending with optional image attachments.
 * Expects template, subject, and table_data in the request body.
 */
router.post("/send-emails", upload.array("images"), async (req, res) => {
  const { template, subject, from, reply, cc, BCC, table_data } = req.body;
  if (!template || !subject || !table_data) {
    return res.status(400).json({ error: "template, subject and table_data are mandatory." });
  }

  // Parse CSV rows from table_data
  const rows = table_data.split("\n").map(l => l.trim()).filter(Boolean);
  const files = req.files || [];

  // Map uploaded images to CIDs for embedding in emails
  const cidMap = new Map();
  const attachments = files.map((file, i) => {
    const cid = `image${i + 1}`;
    cidMap.set(file.originalname, cid);
    return { filename: file.originalname, path: file.path, cid };
  });

  const sucessos = [];
  const falhas = [];

  // Replace <img src="..."> in HTML with CID references for inline images
  const replaceImgSrcWithCid = (html) => {
    let out = html;
    for (const [filename, cid] of cidMap.entries()) {
      const imgTagRegex = new RegExp(
        `<img\\s+[^>]*src=["'][^"']*${escapeRegExp(filename)}[^"']*["'][^>]*>`,
        "gi"
      );
      out = out.replace(
        imgTagRegex,
        (tag) => tag.replace(/src=["'][^"']*["']/i, `src="cid:${cid}"`)
      );
    }
    return out;
  };

  // Iterate over each row (recipient) and send personalized emails
  for (const row of rows) {
    const values = row.split(";").map(v => v.trim());
    const email = values[0];
    if (!email) continue;

    let html = applyPlaceholders(template, values);
    let subj = applyPlaceholders(subject, values);
    html = replaceImgSrcWithCid(html);

    try {
      await transporter.sendMail({
        from: from || process.env.MAIL_FROM,
        to: email,
        cc: cc ? cc.split(";").map(s => s.trim()).filter(Boolean) : undefined,
        bcc: BCC ? BCC.split(";").map(s => s.trim()).filter(Boolean) : undefined,
        replyTo: reply || undefined,
        subject: subj,
        html,
        attachments,
      });
      sucessos.push(email);
      logger.info("Successfully sent email:", email);
    } catch (err) {
      falhas.push(email);
      logger.error("Error sending email", { email, error: err }); // log full error object
    }
  }

  // Generate and save a report of successes and failures
  const relatorio = `Report (${new Date().toISOString()})
Success: ${sucessos.join("\n")}
Error: ${falhas.join("\n")}
`;
  const outName = `email_report_${Date.now()}.txt`;
  fs.writeFileSync(path.join(process.cwd(), outName), relatorio);

  // Clean up uploaded files
  for (const f of files) {
    try { fs.unlinkSync(f.path); } catch { }
  }

  res.json({ sucessos, falhas, relatorio: outName });
});

// Export the router for use in the main app
export default router;