import { Suspense, lazy } from 'react';
import { Link, useParams } from '@modern-js/runtime/router';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';

const RemoteUserName = lazy(() => import('remote/UserName'));

const UsersPage = () => {
  const params = useParams<{ id?: string }>();
  const userId = params?.id ?? 'unknown';

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <div>
          <Typography variant="h4" component="h1">
            Профиль пользователя {userId}
          </Typography>
          <Typography color="text.secondary">
            Компонент имени подтягивается из remote приложения.
          </Typography>
        </div>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{ alignSelf: 'flex-start', textTransform: 'none' }}
        >
          На главную
        </Button>
      </Box>
      <Card>
        <CardContent>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} />
                <Typography>Загружаем данные пользователя...</Typography>
              </Box>
            }
          >
            <RemoteUserName userId={userId} />
          </Suspense>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;
