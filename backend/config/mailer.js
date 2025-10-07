/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Nodemailer transporter configuration for BulkMailer backend. Uses environment variables for SMTP settings.
 */
import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config(); 

// Create a Nodemailer transporter using SMTP settings from environment variables
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  tls: { rejectUnauthorized: false },
});

// Export the transporter for use in email sending modules
export default transporter;
