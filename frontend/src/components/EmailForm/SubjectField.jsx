import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function SubjectField({ value, onChange }) {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} mb={2} sx={{ width: "100%" }}>
      <TextField
        fullWidth
        name="subject"
        label={t("subject")}
        value={value}
        onChange={onChange}
      />
    </Grid>
  );
}
