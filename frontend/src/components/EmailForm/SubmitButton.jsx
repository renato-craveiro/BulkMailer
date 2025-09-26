import { Grid, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
export default function SubmitButton() {
  const { t } = useTranslation();
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <Grid item xs={12} sx={{ display: "flex" }}>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t("submit")}
        </Button>
      </Grid>
    </Grid>
  );
}
