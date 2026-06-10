import { Container, Typography, Box } from '@mui/material';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Loan Portfolio Analytics Dashboard
        </Typography>
      </Box>
      <Dashboard />
    </Container>
  );
}

export default App;
