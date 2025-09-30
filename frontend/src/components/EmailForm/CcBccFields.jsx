/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: CcBccFields component for BulkMailer frontend. Renders input fields for CC and BCC email addresses in the email form.
 */
import { Grid, TextField } from "@mui/material";

// Renders CC and BCC input fields for the email form
export default function CcBccFields({ onChange }) {
  return (
    <Grid container mb={2} sx={{ display: "flex" }}>
      <TextField
        name="cc"
        label="CC"
        onChange={onChange}
        sx={{ flex: 1, mr: 1 }}
      />
      <TextField
        name="BCC"
        label="BCC"
        onChange={onChange}
        sx={{ flex: 1, ml: 1 }}
      />
    </Grid>
  );
}
