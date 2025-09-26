import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function DataField({ value, onChange, mode }) {
  const { t } = useTranslation();
  return (
    <Grid container spacing={1} mb={0.7}>
      <div style={{paddingLeft: "2px", fontSize: "1rem"}}>
        <label>{t("data")}</label>
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
