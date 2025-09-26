import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import emailsRouter from "./routes/emails.js";
import logsRouter from "./routes/logs.js";
import reportsRouter from "./routes/reports.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(emailsRouter);
app.use(logsRouter);
app.use(reportsRouter);

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || "";

app.listen(PORT, HOST, () => logger.info(`Backend started on ${HOST}:${PORT}. SMTP Host: ${process.env.SMTP_HOST}   Port: ${process.env.SMTP_PORT}`));
