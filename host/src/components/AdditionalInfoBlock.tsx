import { Box, CircularProgress, FormControlLabel, Switch, Typography } from "@mui/material";
import { FC, lazy, Suspense, useState } from "react";

const RemoteUserAdditionalInfo = lazy(() => import('remote/UserAdditionalInfo'));

interface Props {
  userId: string;
  locale: string;
}
export const AdditionalInfoBlock:FC<Props> = ({userId, locale}) => {
  const [showAdditional, setShowAdditional] = useState(false);

  return (
    <>
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
          <RemoteUserAdditionalInfo userId={userId} locale={locale} />
        </Suspense>
      )}
    </>
  )
}