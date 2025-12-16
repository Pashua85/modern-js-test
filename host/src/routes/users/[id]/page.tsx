import { Suspense, lazy, useState } from 'react';
import { Link, useParams, useSearchParams } from '@modern-js/runtime/router';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from '@mui/material';
import { AdditionalInfoBlock } from '@/components/AdditionalInfoBlock';

const RemoteUserName = lazy(() => import('remote/UserName'));


const UsersPage = () => {
  const params = useParams<{ id?: string }>();
  const userId = params?.id ?? 'unknown';
  const [searchParams] = useSearchParams();
  const locale = searchParams.get('locale') ?? 'en';

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
          <AdditionalInfoBlock userId={userId} locale={locale} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UsersPage;
