import { Grid, TextField } from "@mui/material";

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
