import { Box, Typography } from '@mui/material';
import { useUserClient } from '@/context/UserClientContext';
import { readUserName } from '@/utils/userNameResource';

type UserNameProps = {
  userId: string;
  locale: string;
};

const UserName = ({ userId, locale }: UserNameProps) => {
  const client = useUserClient();
  const name = readUserName(client, userId, locale);

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
      <Typography sx={{ mt: 1, fontWeight: 600 }}>
        Resolved name: {name}
      </Typography>
    </Box>
  );
};

export default UserName;
