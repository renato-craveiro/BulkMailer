import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function FromReplyFields({ onChange }) {
  const { t } = useTranslation();
  return (
    <Grid container mb={2} sx={{ display: "flex" }}>
      <TextField
        name="from"
        label={t("from")}
        onChange={onChange}
        sx={{ flex: 1, mr: 1 }}
      />
      <TextField
        name="reply"
        label={t("reply")}
        onChange={onChange}
        sx={{ flex: 1, ml: 1 }}
      />
    </Grid>
  );
}
