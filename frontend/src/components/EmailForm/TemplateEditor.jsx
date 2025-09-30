/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: TemplateEditor component for BulkMailer frontend. Renders a CKEditor HTML editor for email templates with theme support and file upload handling.
 */
import { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './style.css';
import { Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTranslation } from "react-i18next";

// Renders a CKEditor HTML editor for editing email templates
export default function TemplateEditor({ value, setForm, mode }) {
  const { t } = useTranslation();
  const editorRef = useRef(null);

  // Update editor styles based on theme mode (dark/light)
  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.editing.view.change((writer) => {
        writer.setStyle(
          "background-color",
          mode === "dark" ? "#121212" : "#fff",
          editor.editing.view.document.getRoot()
        );
        writer.setStyle(
          "color",
          mode === "dark" ? "#eee" : "#000",
          editor.editing.view.document.getRoot()
        );
      });
    }
  }, [mode]);

  return (
    <div className={mode === "dark" ? "ck-dark" : "ck-light"} style={{ marginBottom: "0.5rem" }}>
      <div style={{ paddingLeft: "2px", fontSize: "1rem", marginBottom: "0.5rem" }}>
        <label>{t("template_editor")}</label>
        <Tooltip title={t("help")} arrow>
          <a
            href={"/docs/"+t("html_pdf")} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton size="small">
              <HelpOutlineIcon fontSize="inherit" />
            </IconButton>
          </a>
        </Tooltip>
      </div>
      {/* CKEditor instance for editing HTML template */}
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          editorRef.current = editor;

          // Custom file upload adapter for CKEditor (converts files to base64)
          editor.plugins.get("FileRepository").createUploadAdapter = (loader) => ({
            upload: async () => {
              const file = await loader.file;
              return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve({ default: reader.result });
                reader.onerror = reject;
                reader.readAsDataURL(file);
              });
            },
            abort: () => { }
          });
        }}
        // Update form state when editor content changes
        onChange={(event, editor) => {
          const html = editor.getData();
          setForm((f) => ({ ...f, template: html }));
        }}
      />
    </div>
  );
}
