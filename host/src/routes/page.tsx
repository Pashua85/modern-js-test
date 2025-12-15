import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from '@modern-js/runtime/router';

const Index = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      alignItems: 'flex-start',
    }}
  >
    <Typography variant="h3" component="h1">
      Host приложение запущено
    </Typography>
    <Typography variant="body1">
      Это главная страница оркестратора. Перейдите к списку пользователей, чтобы
      увидеть, как подтягиваются компоненты из remote приложения.
    </Typography>
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
      <Button
        variant="contained"
        component={Link}
        to="/users/1"
        sx={{ textTransform: 'none' }}
      >
        Открыть /users/1
      </Button>
      <Button
        variant="outlined"
        component={Link}
        to="/users/2"
        sx={{ textTransform: 'none' }}
      >
        Открыть /users/2
      </Button>
    </Stack>
  </Box>
);

export default Index;
