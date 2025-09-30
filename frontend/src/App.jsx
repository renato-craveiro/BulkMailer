/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Main React App component for BulkMailer frontend. Handles theme, language, form state, file uploads, and email sending.
 */

import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import AppContainer from "./components/Layout/AppContainer";
import Title from "./components/Layout/Title";
import EmailForm from "./components/EmailForm/EmailForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, IconButton, Snackbar, Alert, Button } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import i18n from './i18n';
import { useTranslation } from 'react-i18next';

export default function App() {
  //  DEFINE HOOKS
  
  const { t } = useTranslation();
  // Theme mode state (light/dark)
  const [mode, setMode] = useState("light");
  // Form state for email fields
  const [form, setForm] = useState({
    from: "",
    reply: "",
    cc: "",
    BCC: "",
    subject: t("title"),
    template: t("html_template"),
    table_data: t("csv_template"),
  });
  // Update document title on language change
  useEffect(() => {
    document.title = t("title"); // "Automação de e-mails" ou "Mass Email Automation"
  }, [t]);

  // Snackbar state for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // Memoized theme object for MUI
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  //  DEFINE HANDLERS

  // Handle form field changes
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Handle HTML template file upload
  const handleHtmlFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((f) => ({ ...f, template: ev.target.result }));
    reader.readAsText(file, "windows-1252");
  };

  // Handle CSV data file upload
  const handleCSVFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result.replace(/\r\n|\r/g, "\n");
      setForm((f) => ({ ...f, table_data: text }));
    };
    reader.readAsText(file, "windows-1252");
  };

  // Show a notification snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Handle form submission to send emails
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, v));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/send-emails`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { sucessos, falhas, relatorio } = res.data;

      let severity = "success";

      if (falhas.length > 0 && sucessos.length === 0) {
        severity = "error";
      } else if (falhas.length > 0) {
        severity = "warning";
      }

      showSnackbar(
        `Enviados: ${sucessos.length} | Falhados: ${falhas.length} | Relatório: ${relatorio}`,
        severity
      );
    } catch (err) {
      showSnackbar(
        "Erro ao enviar: " + (err?.response?.data?.error || err.message),
        "error"
      );
    }
  };

  // Change application language and update form templates
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // 'en' ou 'pt'
    setForm((f) => ({ ...f, table_data: t("csv_template"), template: t("html_template"), subject: t("title") }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer>
        {/* Toggle for Dark/Light Mode and Language */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.5rem", marginBottom: "1rem" }}>
          <Button onClick={() => changeLanguage('pt')} color="inherit" sx={{ m: 0,p: 0,minWidth: "2rem",lineHeight: 1,fontSize: "1rem"}}>PT</Button>
          <Button onClick={() => changeLanguage('en')} color="inherit" sx={{ m: 0,p: 0,minWidth: "2rem",lineHeight: 1,fontSize: "1rem"}}>EN</Button>
          
          <IconButton
            onClick={() => setMode(prev => (prev === "light" ? "dark" : "light"))}
            color="inherit"
          >
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </div>

        {/* Header */}
        <Title />

        {/* Email Form */}
        <EmailForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onHtmlUpload={handleHtmlFile}
          onCSVUpload={handleCSVFile}
          setForm={setForm}
          mode={mode}
        />

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </AppContainer>
    </ThemeProvider>
  );
}
