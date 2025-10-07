/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: FileUploader component for BulkMailer frontend. Renders a button for uploading files and handles file input events.
 */

// FileUploader renders a button for file selection and triggers the provided upload handler


// components/FileUploader.jsx
import { Grid, Button } from "@mui/material";

export default function FileUploader({
  onFileUpload,
  label = "Carregar arquivo",
  accept = "*/*",
  //multiple = false,
  attachment = false
}) {
  return (
    <Grid container spacing={2} mb={2} sx={{ width: "100%", justifyContent: "flex-end" }}>
      <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" component="label">
          {label}
          <input
            type="file"
            hidden
            accept={accept}
            multiple={attachment} // só será true se for anexos
            onChange={(e) =>
              attachment
                ? onFileUpload(Array.from(e.target.files || []))
                : onFileUpload(e)
            }
          />
        </Button>
      </Grid>
    </Grid>
  );
}

