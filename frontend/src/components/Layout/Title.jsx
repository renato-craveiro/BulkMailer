import { Typography, useMediaQuery, useTheme, Box } from "@mui/material";
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import { useTranslation } from 'react-i18next';

export default function Title() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  return (
    <Box textAlign="center" mb={4} mt={2}>
      <Box display="flex" justifyContent="center" alignItems="center" mb={1}>
        <MailOutlineIcon fontSize={isMobile ? "medium" : "large"} sx={{ mr: 1 }} />
        <Typography variant={isMobile ? "h6" : "h4"} fontWeight={600}>
          {t('title')}
        </Typography>
        <MailOutlineIcon fontSize={isMobile ? "medium" : "large"} sx={{ ml: 1 }} />
      </Box>
      <Typography variant={isMobile ? "body2" : "subtitle1"} color="textSecondary">
          {t('label')}
      </Typography>
    </Box>
  );
}
