import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import transporter from "../config/mailer.js";
import logger from "../config/logger.js";
import { escapeRegExp, applyPlaceholders } from "../utils/helpers.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/send-emails", upload.array("images"), async (req, res) => {
  const { template, subject, from, reply, cc, BCC, table_data } = req.body;
  //console.log("Transporter: "+process.env.SMTP_HOST)
  if (!template || !subject || !table_data) {
    return res.status(400).json({ error: "template, subject and table_data are mandatory." });
  }

  const rows = table_data.split("\n").map(l => l.trim()).filter(Boolean);
  const files = req.files || [];

  // mapeamento de imagens
  const cidMap = new Map();
  const attachments = files.map((file, i) => {
    const cid = `image${i + 1}`;
    cidMap.set(file.originalname, cid);
    return { filename: file.originalname, path: file.path, cid };
  });

  const sucessos = [];
  const falhas = [];

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
      console.log("Transporter: "+process.env.SMTP_HOST)
      logger.error("Error sending email", { email, error: err }); // loga o objeto inteiro
    }
  }

  const relatorio = `Report (${new Date().toISOString()})
Success: ${sucessos.join("\n")}
Error: ${falhas.join("\n")}
`;
  const outName = `email_report_${Date.now()}.txt`;
  fs.writeFileSync(path.join(process.cwd(), outName), relatorio);

  // limpar uploads
  for (const f of files) {
    try { fs.unlinkSync(f.path); } catch {}
  }

  res.json({ sucessos, falhas, relatorio: outName });
});

export default router;
