import React, { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import OpportunityCard from '../../components/OpportunityCard ';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import ComingSoonCard from '../../components/ComingSoonCard ';
import ChooseCourseForVolunteering from '../../components/ChooseCourseForVolunteering ';
import styles from "./style.module.css";
import Typography from '@mui/material/Typography';

const HomePage = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCause, setSelectedCause] = useState('');

  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get('https://volunteer-backend-b6ip.onrender.com/api/opportunities');
        setOpportunities(response.data.opportunities);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, []);

  const filteredOpportunities = opportunities.filter(
    opportunity =>
      opportunity.title.toLowerCase().includes(searchTerm.toLowerCase())  &&
      (selectedCause ? opportunity.category === selectedCause : true)
  );

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  
  const handleCauseSelection = (selectedFilter) => {
    setSelectedCause(selectedFilter);
  };

  return (
    <Container style={{paddingTop: '30px',minHeight: "100vh"}}>
      <div>
       
        <TextField
          label="Search by Opportunity Name"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', width: '100%'}}
        />

        <div className={styles.cause}>
        <ComingSoonCard/>

        <ChooseCourseForVolunteering handleFilterSelection={handleCauseSelection} />
        </div>

        
        <Typography variant="h6" component="h2">Opportunities</Typography>
        <div className={styles.opportunity_list}>
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.map(opportunity => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
