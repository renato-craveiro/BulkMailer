/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: EmailForm component for BulkMailer frontend. Renders the main email sending form with all input fields and file uploaders.
 */

import { Grid } from "@mui/material";
import FromReplyFields from "./FromReplyFields";
import CcBccFields from "./CcBccFields";
import SubjectField from "./SubjectField";
import FileUploader from "./FileUploader";
import TemplateEditor from "./TemplateEditor";
import DataField from "./DataField";
import SubmitButton from "./SubmitButton";
import { useTranslation } from "react-i18next";

// EmailForm renders all fields and uploaders for sending bulk emails
export default function EmailForm({ form, onChange, onSubmit, onHtmlUpload,onCSVUpload, setForm,mode }) {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} style={{ margin: "4vw" }}>
      {/* Sender and reply-to fields */}
      <FromReplyFields onChange={onChange} />
      {/* CC and BCC fields */}
      <CcBccFields onChange={onChange} />
      {/* Subject field */}
      <SubjectField value={form.subject} onChange={onChange} />

      <br></br>
      {/* CSV data textarea */}
      <DataField value={form.table_data} onChange={onChange} mode={mode}/>
      {/* CSV file uploader */}
      <FileUploader onFileUpload={onCSVUpload} label={t("upload_csv")}  accept=".csv,text/csv"/>
      <br></br>
      {/* HTML template editor */}
      <TemplateEditor value={form.template} setForm={setForm} mode={mode} />
      {/* HTML file uploader */}
      <FileUploader onFileUpload={onHtmlUpload} label={t("upload_html")} accept=".html,text/html" />
      {/* Submit button */}
      <SubmitButton />
    </form>
  );
}