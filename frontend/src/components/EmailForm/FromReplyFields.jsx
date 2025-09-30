/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: FromReplyFields component for BulkMailer frontend. Renders input fields for 'From' and 'Reply-To' email addresses in the email form.
 */
import { Grid, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

// Renders 'From' and 'Reply-To' input fields for the email form
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
