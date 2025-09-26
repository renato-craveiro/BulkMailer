import { Grid } from "@mui/material";
import FromReplyFields from "./FromReplyFields";
import CcBccFields from "./CcBccFields";
import SubjectField from "./SubjectField";
import FileUploader from "./FileUploader";
import TemplateEditor from "./TemplateEditor";
import DataField from "./DataField";
import SubmitButton from "./SubmitButton";
import { useTranslation } from "react-i18next";


export default function EmailForm({ form, onChange, onSubmit, onHtmlUpload,onCSVUpload, setForm,mode }) {
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit} style={{ margin: "4vw" }}>
      <FromReplyFields onChange={onChange} />
      <CcBccFields onChange={onChange} />
      <SubjectField value={form.subject} onChange={onChange} />

      <br></br>
      <DataField value={form.table_data} onChange={onChange} mode={mode}/>
      <FileUploader onFileUpload={onCSVUpload} label={t("upload_csv")}  accept=".csv,text/csv"/>
      <br></br>
      <TemplateEditor value={form.template} setForm={setForm} mode={mode} />
      <FileUploader onFileUpload={onHtmlUpload} label={t("upload_html")} accept=".html,text/html" />
      <SubmitButton />
    </form>
  );
}
