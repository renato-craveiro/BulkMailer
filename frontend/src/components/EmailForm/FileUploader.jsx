/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: FileUploader component for BulkMailer frontend. Renders a button for uploading files and handles file input events.
 */
import { Grid, Button } from "@mui/material";

// FileUploader renders a button for file selection and triggers the provided upload handler
export default function FileUploader({
  onFileUpload,
  label = "Carregar arquivo",
  accept = "*/*",
}) {
  return (
    <Grid container spacing={2} mb={2} sx={{ width: "100%", justifyContent: "flex-end" }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" component="label">
          {label}
          {/* Hidden file input triggers onFileUpload when a file is selected */}
          <input type="file" hidden accept={accept} onChange={onFileUpload} />
        </Button>
      </Grid>
    </Grid>
  );
}
