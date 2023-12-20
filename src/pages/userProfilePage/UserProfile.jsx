import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams } from 'react-router-dom'
import OrganizationTable from '../../components/OrganizationTable';
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Container from '@mui/material/Container';
import styles from "./styles.module.css";
import OrganizationForm from '../../components/OrganizationForm'
import InterestsList from '../../components/IntrestList';
import General from '../../components/General';
import Additional from '../../components/Additional';
import { stringAvatar } from '../../utilis/string-munpulation';


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [showOrgForm, setShowOrgForm] = useState(false);

  let {id} = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${id}`);
        console.log(response.data)
        setUserData(response.data); 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  console.log(userData)

  
  const handleOrgFormToggle = () => {
    setShowOrgForm(!showOrgForm);
  };

  const handleCloseOrgForm = () => {
    setShowOrgForm(false);
  };

  return (
    <Container >
      {userData ? (
        <div> 
           
          <Fab className={styles.add_button} color="primary" aria-label="add" onClick={handleOrgFormToggle}>
            <AddIcon />
          </Fab>
          
      
         
        {showOrgForm && <OrganizationForm open={showOrgForm} handleClose={handleCloseOrgForm}/>} 
        <Box className={styles.info_box} sx={{ p: 3,  }}>
          <Avatar {...stringAvatar(`${userData.firstName} ${userData.lastName}`)} />
          <Typography>{userData.firstName}</Typography>
          <Typography>24</Typography>
        </Box>

          <InterestsList className={styles.info_box} />

          {userData.organization && <OrganizationTable  organization={userData}/>  }
          <General userData={userData}/>
          <Additional/>
        </div>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
        )}
    </Container>
  );
};

export default UserProfile;
