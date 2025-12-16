import { Box, Typography } from '@mui/material';
import { useUserClient } from '@/context/UserClientContext';
import { readUserName } from '@/utils/userNameResource';

type UserAdditionalInfoProps = {
  userId: string;
  locale: string;
};

const UserAdditionalInfo = ({ userId, locale }: UserAdditionalInfoProps) => {
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
      <Typography variant="h4">Additional Info</Typography>
      <Typography>
        Requested userId: <b>{userId}</b>
      </Typography>
      <Typography>
        Requested locale: <b>{locale}</b>
      </Typography>
      <Typography sx={{ mt: 1, fontWeight: 600 }}>Resolved name: {name}</Typography>
    </Box>
  );
};

export default UserAdditionalInfo;
