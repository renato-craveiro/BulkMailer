/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: AppContainer component for BulkMailer frontend. Provides a centered, themed layout for the main content.
 */

import { Box, Paper } from "@mui/material";

// AppContainer wraps children in a centered, responsive Paper card with theme-based background
export default function AppContainer({ children }) {
  return (
    <Box
      sx={{
        width: "95vw",
        minHeight: "90vh",
        bgcolor: "background.default", // uses theme background color
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
          bgcolor: "background.paper", // card color based on theme
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}