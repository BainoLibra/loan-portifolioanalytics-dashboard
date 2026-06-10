import { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  CircularProgress,
} from '@mui/material';
import KeyMetricCard from '../components/KeyMetricCard.jsx';
import PortfolioChart from '../components/PortfolioChart.jsx';
import {
  fetchSummary,
  fetchDefaultingClients,
  fetchTopOfficers,
  fetchBranchGrowth,
  fetchPAR,
} from '../services/api.js';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [defaults, setDefaults] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [branchGrowth, setBranchGrowth] = useState([]);
  const [par, setPar] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, defaultsRes, officersRes, growthRes, parRes] = await Promise.all([
          fetchSummary(),
          fetchDefaultingClients(),
          fetchTopOfficers(),
          fetchBranchGrowth(),
          fetchPAR(),
        ]);
        setSummary(summaryRes.data);
        setDefaults(defaultsRes.data);
        setOfficers(officersRes.data);
        setBranchGrowth(growthRes.data.map((row) => ({
          label: `${row.month}/${row.year}`,
          branch: row.name,
          disbursed: row.disbursed,
        })));
        setPar(parRes.data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <KeyMetricCard title="Total Lent" value={`$${summary.totalLent.toLocaleString()}`} caption="Money disbursed to borrowers" />
        </Grid>
        <Grid item xs={12} md={3}>
          <KeyMetricCard title="Outstanding" value={`$${summary.outstanding.toLocaleString()}`} caption="Total outstanding balance" />
        </Grid>
        <Grid item xs={12} md={3}>
          <KeyMetricCard title="Defaults" value={summary.defaultCount} caption="Number of defaulted loans" />
        </Grid>
        <Grid item xs={12} md={3}>
          <KeyMetricCard title="Portfolio at Risk" value={`${par.parRatio}%`} caption="Share of at-risk outstanding balance" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Branch Growth (last 6 months)
            </Typography>
            <PortfolioChart data={branchGrowth} />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Loan Officers
            </Typography>
            {officers.slice(0, 5).map((officer) => (
              <Box key={officer.id} mb={2}>
                <Typography variant="subtitle1">{officer.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {officer.branch} — ${Number(officer.volume).toLocaleString()} disbursed
                </Typography>
              </Box>
            ))}
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio at Risk
            </Typography>
            <Typography variant="body1">${par.parAmount.toLocaleString()} at risk</Typography>
            <Typography variant="body2" color="text.secondary">
              Total outstanding ${par.totalOutstanding.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ mt: 3, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Defaulting Clients
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Client</TableCell>
              <TableCell>Branch</TableCell>
              <TableCell>Loan ID</TableCell>
              <TableCell align="right">Outstanding</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {defaults.map((item) => (
              <TableRow key={item.loan_id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.branch}</TableCell>
                <TableCell>{item.loan_id}</TableCell>
                <TableCell align="right">${Number(item.outstanding_amount).toLocaleString()}</TableCell>
                <TableCell>{item.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default Dashboard;
