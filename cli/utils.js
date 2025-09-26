import fs from "fs";

/**
 * Valida se um ficheiro existe.
 * Retorna true se existir, ou uma mensagem de erro se não existir.
 */
export function validateFileExists(input) {
  return fs.existsSync(input) ? true : "File not Found";
}

/**
 * Formata timestamp ou número para data legível PT
 */
export function formatDate(ts) {
  const date = new Date(ts);
  return date.toLocaleString("en-UK");
}

/**
 * Extrai timestamp de nomes de ficheiro, retornando apenas números
 */
export function extractTimestamp(filename) {
  return Number(filename.replace(/\D/g, ""));
}
