import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from '@modern-js/runtime/router';

const users = [
  { id: '1', label: 'Alice' },
  { id: '2', label: 'Bob' },
  { id: '3', label: 'Charlie' },
];

const locales = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
];

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
      Выберите профиль и локаль — так проще воспроизвести утечку кеша между
      запросами и увидеть, как remote сохраняет состояние на процесс.
    </Typography>
    <Stack spacing={3} sx={{ width: '100%' }}>
      {users.map((user) => (
        <Box
          key={user.id}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            p: 2,
          }}
        >
          <Typography fontWeight={600} sx={{ mb: 1 }}>
            Пользователь {user.label} (id: {user.id})
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {locales.map((locale) => (
              <Button
                key={locale.code}
                component={Link}
                to={`/users/${user.id}?locale=${locale.code}`}
                variant={locale.code === 'en' ? 'contained' : 'outlined'}
                sx={{ textTransform: 'none' }}
              >
                {locale.label} версия
              </Button>
            ))}
          </Stack>
        </Box>
      ))}
    </Stack>
  </Box>
);

export default Index;
