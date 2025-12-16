import { Box, Typography } from '@mui/material';
import { getUserName } from '@/services/userService';

const resolvedNames = new Map<string, string>();
const pendingRequests = new Map<string, Promise<string>>();

/**
 * Ручная реализация «ресурса» для React Suspense:
 * возвращает закэшированное значение или бросает Promise загрузки,
 * чтобы Suspense показал fallback и повторил рендер после завершения.
 */
function readUserName(userId: string, locale: string) {
  const cacheKey = `${userId}:${locale}`;

  if (resolvedNames.has(cacheKey)) {
    const name = resolvedNames.get(cacheKey)!;
    resolvedNames.delete(cacheKey);
    return name;
  }

  let pending = pendingRequests.get(cacheKey);
  if (!pending) {
    pending = getUserName(userId, locale).then((name) => {
      pendingRequests.delete(cacheKey);
      resolvedNames.set(cacheKey, name);
      return name;
    });
    pendingRequests.set(cacheKey, pending);
  }

  throw pending;
}

type UserAdditionalInfoProps = {
  userId: string;
  locale: string;
  showAdditional?: boolean;
};

const UserAdditionalInfo = ({
  userId,
  locale,
  showAdditional,
}: UserAdditionalInfoProps) => {
  const name = readUserName(userId, locale);

  return (
    <Box
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        p: 2,
        borderRadius: 1,
        bgcolor: 'background.default',
      }}
    >
      <Typography variant='h4'>
        Additional Info
      </Typography>
      <Typography>
        Requested userId: <b>{userId}</b>
      </Typography>
      <Typography>
        Requested locale: <b>{locale}</b>
      </Typography>
      <Typography sx={{ mt: 1, fontWeight: 600 }}>
        Resolved name: {name}
      </Typography>
    </Box>
  );
};

export default UserAdditionalInfo;
