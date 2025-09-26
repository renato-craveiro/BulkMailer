// utils/formHandlers.js
export const handleHtmlFile = (setForm) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((f) => ({ ...f, template: ev.target.result }));
    reader.readAsText(file, "windows-1252");
  };
  
  export const handleCSVFile = (setForm) => async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target.result.replace(/\r\n|\r/g, "\n"); // normaliza linhas
      setForm((f) => ({ ...f, table_data: text }));
    };
    reader.readAsText(file, "windows-1252");
  };
  
  export const handleChange = (setForm) => (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  