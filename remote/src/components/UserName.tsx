import { Typography } from '@mui/material';

type UserNameProps = {
  userId?: string;
};

const UserName = ({ userId }: UserNameProps) => (
  <Typography variant="h5" component="p" sx={{ fontWeight: 700 }}>
    Пользователь {userId ?? 'без ID'}
  </Typography>
);

export default UserName;
