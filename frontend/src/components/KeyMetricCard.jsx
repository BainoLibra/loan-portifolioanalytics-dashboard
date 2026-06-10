import { Card, CardContent, Typography } from '@mui/material';

function KeyMetricCard({ title, value, caption }) {
  return (
    <Card sx={{ minWidth: 220, width: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" sx={{ mb: 1.5 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {caption}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default KeyMetricCard;
