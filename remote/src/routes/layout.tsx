import { Outlet } from '@modern-js/runtime/router';
import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box component="main">
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
