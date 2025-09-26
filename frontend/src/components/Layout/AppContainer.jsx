import { Box, Paper } from "@mui/material";

export default function AppContainer({ children }) {
  return (
    <Box
      sx={{
        width: "95vw",
        minHeight: "90vh",
        bgcolor: "background.default", // usa a cor de fundo do tema
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0.5vw"
      }}
    >
      <Paper
        sx={{
          p: 3,
          width: "80%",
          height: "80%",
          maxWidth: 800,
          bgcolor: "background.paper", // cor do "card" conforme o tema
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
