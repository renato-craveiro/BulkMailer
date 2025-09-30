/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: SubjectField component for BulkMailer frontend. Renders an input field for the email subject in the email form.
 */
import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

// Renders the subject input field for the email form
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
