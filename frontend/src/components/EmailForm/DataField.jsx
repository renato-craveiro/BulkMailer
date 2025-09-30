/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: DataField component for BulkMailer frontend. Renders a textarea for CSV data input with theme-based styling.
 */

import { Grid, Tooltip, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useTranslation } from "react-i18next";

// Renders a textarea for CSV data input, with dynamic styling based on theme mode
export default function DataField({ value, onChange, mode }) {

  const { t } = useTranslation();
  return (
    <Grid container spacing={1} mb={0.7}>
      <div style={{ paddingLeft: "2px", fontSize: "1rem" }}>
        <label>{t("data")}</label>
        <Tooltip title={t("help") } arrow>
          <a
            href={"/docs/"+t("csv_pdf")} 
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconButton size="small">
              <HelpOutlineIcon fontSize="inherit" />
            </IconButton>
          </a>
        </Tooltip>
      </div>
      <textarea
        name="table_data"
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          minHeight: 100,
          maxHeight: 150,
          overflowY: "auto",
          overflowX: "hidden",
          padding: 15,
          fontFamily: "Roboto, sans-serif",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
          backgroundColor: mode === "dark" ? "#0000003a" : "#fff",
          color: mode === "dark" ? "#eee" : "#000",
          border: `1px solid ${mode === "dark" ? "#333" : "#ccc"}`,
        }}
      />
    </Grid>
  );
}
