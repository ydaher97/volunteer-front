import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import NatureIcon from '@mui/icons-material/Nature';
import PeopleIcon from '@mui/icons-material/People';

const ChooseCourseForVolunteering = ({ handleFilterSelection }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectFilter = (filter) => {
    setSelectedFilter(filter);
    handleFilterSelection(filter);
    console.log('Selected Filter:', filter);
  };

  const filterOptions = [
    { id: 1, label: 'Health', icon: <FavoriteIcon /> },
    { id: 2, label: 'Education', icon: <SchoolIcon /> },
    { id: 3, label: 'Environment', icon: <NatureIcon /> },
    { id: 4, label: 'Community', icon: <PeopleIcon /> },
  ];

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h6" component="h2" style={{ marginBottom: '10px' }}>
        Choose a Cause
      </Typography>

      <Grid container spacing={3}>
        {filterOptions.map((filter) => (
          <Grid key={filter.id} item xs={6} sm={3} md={3} lg={3}>
            <Card
              onClick={() => handleSelectFilter(filter.label)}
              variant={selectedFilter === filter.label ? 'elevation' : 'outlined'}
              style={{
                backgroundColor:
                  selectedFilter === filter.label ? 'transparent' : 'rgb(207 210 217)',
                cursor: 'pointer',
                borderRadius: '10px',
                padding: '10px'
              }}
            >
              <CardContent style={{ textAlign: 'center' }}>
                {filter.icon}
                <Typography variant="h6" component="h2" style={{ marginTop: '10px' }}>
                  {filter.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ChooseCourseForVolunteering;
