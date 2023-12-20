import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

const OrganizationTable = ({ organization }) => {
  let { id } = useParams();

  return (
    <Box
      sx={{
        borderRadius: '8px',
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#f5f5f5', // Example background color
      }}
    >
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Organization
      </Typography>
      <Typography variant="body1" mb={1}>
        Name:  {organization.organization.name}
      </Typography>
      <Typography variant="body1" mb={1}>
        Description:  {organization.organization.description}
      </Typography>
      <Typography variant="body1" mb={1}>
        Contact:  {organization.organization.contact}
      </Typography>
      <Typography variant="body1" mb={1}>
        Location:  {organization.organization.location}
      </Typography>
      <Link to={`/users/${id}/organization/${organization.organization._id}`} style={{ textDecoration: 'none' }}>
        <Button variant="contained" sx={{ backgroundColor: '#664DFF', color: '#fff', borderRadius: '5px' }}>
          Go to Dashboard
        </Button>
      </Link>
    </Box>
  );
};

export default OrganizationTable;
