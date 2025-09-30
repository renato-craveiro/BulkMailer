/**
 * Author: <Renato Craveiro>
 * Email: <renatoalex.olivcraveiro@gmail.com>
 * Date: 2025-09
 * Description: Title component for BulkMailer frontend. Displays the app title and label with responsive design and icons.
 */
import { Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useTranslation } from 'react-i18next';

// Title component displays the main app title and subtitle with icons
export default function Title() {
  const theme = useTheme();
  // Detect if the screen size is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <Box textAlign="center" mb={4} mt={2}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        {/* Mail icons and title text, responsive size */}
        <MailOutlineIcon fontSize={isMobile ? "medium" : "large"} sx={{ mr: 1 }} />
        <Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
          {t('title')}
        </Typography>
        <MailOutlineIcon fontSize={isMobile ? "medium" : "large"} sx={{ ml: 1 }} />
      </Box>
      {/* Subtitle/label text, responsive size */}
      <Typography variant={isMobile ? "body2" : "subtitle1"} color="textSecondary">
          {t('label')}
      </Typography>
    </Box>
  );
}
