import { Grid, Button } from "@mui/material";

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
          <input type="file" hidden accept={accept} onChange={onFileUpload} />
        </Button>
      </Grid>
    </Grid>
  );
}
