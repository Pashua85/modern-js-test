import { Suspense, lazy, useState } from 'react';
import { Link, useParams, useSearchParams } from '@modern-js/runtime/router';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  CircularProgress,
} from '@mui/material';

const RemoteUserName = lazy(() => import('remote/UserName'));

const UsersPage = () => {
  const params = useParams<{ id?: string }>();
  const userId = params?.id ?? 'unknown';
  const [searchParams] = useSearchParams();
  const locale = searchParams.get('locale') ?? 'en';
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
        <div>
          <Typography variant="h4" component="h1">
            Профиль пользователя {userId}
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
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Suspense
            fallback={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} />
                <Typography variant="body2">
                  Загружаем данные из remote...
                </Typography>
              </Box>
            }
          >
            <RemoteUserName userId={userId} locale={locale} />
          </Suspense>
          <FormControlLabel
            control={
              <Switch
                checked={showAdditional}
                onChange={(event) => setShowAdditional(event.target.checked)}
              />
            }
            label="Показать дополнительную панель"
            sx={{ alignSelf: 'flex-start' }}
          />
          {showAdditional && (
            <Suspense
              fallback={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={18} />
                  <Typography variant="body2">
                    Загружаем дополнительную панель...
                  </Typography>
                </Box>
              }
            >
              <RemoteUserName userId={userId} locale={locale} showAdditional />
            </Suspense>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;
