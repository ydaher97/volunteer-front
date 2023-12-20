import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ComingSoonCard = () => {
  return (
    <Card variant="outlined" style={{ maxWidth: 350, margin: '20px auto', backgroundColor: "#664DFF" }}>
      <CardContent style={{ color: 'white' }}>
        <Typography variant="h5" component="h2" style={{ color: 'white' }}>
          Joining Volunteer Group
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom style={{ color: 'white' }}>
          Coming Soon
        </Typography>
        <Button disabled style={{ color: '#664DFF', backgroundColor: 'white' }}>
          Coming Soon
        </Button>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCard;
