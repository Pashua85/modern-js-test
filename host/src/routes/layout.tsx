import { Outlet } from '@modern-js/runtime/router';
import { Container, CssBaseline, Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth="lg"
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          py: 4,
        }}
      >
        <Box component="main" sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
}
