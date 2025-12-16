import { Box, CircularProgress, Typography } from '@mui/material';

const UserNameLoading = () => (
  <Box
    sx={{
      border: '1px solid',
      borderColor: 'divider',
      p: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      opacity: 0.85,
      borderRadius: 1,
      bgcolor: 'background.paper',
    }}
  >
    <CircularProgress size={28} thickness={4} />
    <Box>
      <Typography fontWeight={600}>Запрашиваем remote данные…</Typography>
      <Typography variant="body2" color="text.secondary">
        Ответ придёт через пару секунд (эмулируем I/O).
      </Typography>
    </Box>
  </Box>
);

export default UserNameLoading;
