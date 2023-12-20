import React, { useState,useEffect } from 'react';
import axios from 'axios';
import OpportunityForm from '../../components/OpportunityForm';
import { useParams } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import styles from "./styles.module.css";
import OrganizationDetails from './components/OrganizationDetails';
import OrganizationOpportunities from '../../components/OrganizationOpportunities';
import { useNavigate } from 'react-router-dom';

const imageUrls = [
  '../../public/volunteering.jpg',
  '../../public/kids.jpg',
  '../../public/images.png',
  '../../public/Volunteer_kate1.webp'
];


const OrganizationPage = () => {
  let { ordId } = useParams();
  const [organization, setOrganization] = useState(null);
  const navigate =useNavigate()
  const [randomImage, setRandomImage] = useState('');


  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImage(imageUrls[randomIndex]);
  }, []);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/organizations/${ordId}`);
       
        setOrganization(response.data); 
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    fetchOrganization();
  }, [ordId]);

  const [showForm, setShowForm] = useState(false);
  const [opportunityData, setOpportunityData] = useState({
    title: '',
    description: '',
    organization: ordId,
    startDate: '',
    endDate: '',
    place: '',
    long: 0,
    lat: 0,
  });


  const handleDeleteOrganization = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/organizations/${ordId}`);
      setOrganization(null);
      navigate(-1)

    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'lat' || name === 'long' ? parseFloat(value) : value;
    setOpportunityData({
      ...opportunityData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(opportunityData)
      const response = await axios.post('http://localhost:8080/api/opportunities', opportunityData);
      console.log('Opportunity created:', response.data);
     
      setOpportunityData({
        title: '',
        description: '',
        organization: ordId,
        startDate: '',
        endDate: '',
        place: '',
        longitude: 0,
        latitude: 0,
      });
      setShowForm(false); 
    } catch (error) {
      console.error('Error creating opportunity:', error);
    }
  };

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  return (
    <Container sx={{marginTop: '35px'}}>
       <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="error" onClick={handleDeleteOrganization}>
          Delete Organization
        </Button>
      </Box>
      <h2>Organization Page</h2>
      <OrganizationDetails organization={organization} />

      {organization?.organization.opportunities && organization.organization.opportunities.map(opportunitie =>       
        <OrganizationOpportunities key={opportunitie} opportunityIds={opportunitie} randomImage={randomImage}/>
      )}

      

      <Fab className={styles.add_button} color="primary" aria-label="add" onClick={handleOpenForm}>
            <AddIcon />
          </Fab>

      <Dialog open={showForm} onClose={handleCloseForm}>
        <DialogTitle>Create Opportunity</DialogTitle>
        <DialogContent>
          <OpportunityForm
            opportunityData={opportunityData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            showForm={showForm} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrganizationPage;
