import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const General = ({ userData }) => {
  const labelStyle = {
    fontWeight: 'bold',
    marginRight: '5px',
  };

  const textStyle = {
    marginBottom: '8px',
  };

  return (
    <div>
      <Typography variant="h6">General</Typography>

      <Box>
        <Typography style={textStyle}>
          <span style={labelStyle}>Full Name:</span>
          {userData.firstName} {userData.lastName}
        </Typography>

        <Typography style={textStyle}>
          <span style={labelStyle}>Email:</span>
          {userData.email}
        </Typography>

        <Typography style={textStyle}>
          <span style={labelStyle}>Phone:</span>
          0527233432 {/* Replace with userData.phone */}
        </Typography>
      </Box>
    </div>
  );
};

export default General;
