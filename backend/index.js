/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Entry point for BulkMailer backend server. Sets up Express, middleware, and routes for emails, logs, and reports.
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import logger from "./config/logger.js";
import emailsRouter from "./routes/emails.js";
import logsRouter from "./routes/logs.js";
import reportsRouter from "./routes/reports.js";

// Load environment variables from .env file
dotenv.config();

// Create Express application
const app = express();
// Enable CORS for cross-origin requests
app.use(cors());
// Parse JSON request bodies
app.use(express.json());
// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Register routers for different API endpoints
app.use(emailsRouter);
app.use(logsRouter);
app.use(reportsRouter);

// Start the server on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => logger.info(`Backend started on port ${PORT}`));
