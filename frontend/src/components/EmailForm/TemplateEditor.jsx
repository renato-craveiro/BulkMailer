import { useEffect, useRef } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import './test.css';
import { useTranslation } from "react-i18next";

export default function TemplateEditor({ value, setForm, mode }) {
  const { t } = useTranslation();
  const editorRef = useRef(null);

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
      <div style={{paddingLeft: "2px", fontSize: "1rem", marginBottom: "0.5rem"}}>
        <label>{t("template_editor")}</label>
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        onReady={(editor) => {
          editorRef.current = editor;

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
            abort: () => {}
          });
        }}
        onChange={(event, editor) => {
          const html = editor.getData();
          setForm((f) => ({ ...f, template: html }));
        }}
      />
    </div>
  );
}
