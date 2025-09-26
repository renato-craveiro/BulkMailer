// escapar nomes para regex
export const escapeRegExp = (s) =>
    s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  
  // substitui {0}, {1}, ...
  export const applyPlaceholders = (str, values) =>
    values.reduce((acc, val, idx) => acc.replaceAll(`{${idx}}`, val.trim()), str);
  