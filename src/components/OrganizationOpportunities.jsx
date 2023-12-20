import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import PlaceIcon from '@mui/icons-material/Place';
import OpportunityForm from './OpportunityForm';
import {transformOpportunityForForm,stringAvatar} from '../utilis/string-munpulation'


const OpportunityList = ({ opportunityIds,randomImage }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentOpportunity, setCurrentOpportunity] = useState(null);
  const [volunteerAvatars, setVolunteerAvatars] = useState([]);
 
  const handleDialogOpen = () => {
    setOpenDetailsDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDetailsDialog(false);
    setOpenEditDialog(false);
  };

  const fetchVolunteerAvatars = async (volunteerIds) => {
    try {
      const usersData = await Promise.all(
        volunteerIds.map(async (volunteerId) => {
          const response = await axios.get(`https://volunteer-backend-b6ip.onrender.com/api/users/${volunteerId}`);
          return response.data;
        })
      );
      const avatars = usersData.map((user) => stringAvatar(`${user.firstName} ${user.lastName}`));
      setVolunteerAvatars(avatars)
    } catch (error) {
      console.error('Error fetching volunteer avatars:', error);
      return [];
    }
  };

  const handleDeleteOpportunity = async (opportunityId) => {
    try {
      await axios.delete(`https://volunteer-backend-b6ip.onrender.com/api/opportunities/${opportunityId}`);
      const updatedOpportunities = opportunities.filter(opportunity => opportunity._id !== opportunityId);
      setOpportunities(updatedOpportunities);
    } catch (error) {
      console.error('Error deleting opportunity:', error);
    }
  };


  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await axios.get(`https://volunteer-backend-b6ip.onrender.com/api/opportunities`);
        const filteredOpportunities = response.data.opportunities.filter(opportunity =>
          opportunityIds.includes(opportunity._id)
        );
        setOpportunities(filteredOpportunities);
        const volunteerAvatarsList = await Promise.all(
          filteredOpportunities.map((opportunity) => fetchVolunteerAvatars(opportunity.volunteers))
        );
        // setVolunteerAvatars(volunteerAvatarsList);
      } catch (error) {
        console.error('Error fetching opportunities:', error);
      }
    };

    fetchOpportunities();
  }, [opportunityIds]);

  const handleEditOpportunity = (opportunity) => {
    setCurrentOpportunity(opportunity);
    setOpenEditDialog(true);
  };

  const handleUpdateOpportunity = async (updatedOpportunity) => {
    try {
      await axios.put(`https://volunteer-backend-b6ip.onrender.com/api/opportunities/${updatedOpportunity._id}`, updatedOpportunity);
      const updatedOpportunities = opportunities.map(opportunity =>
        opportunity._id === updatedOpportunity._id ? updatedOpportunity : opportunity
      );
      setOpportunities(updatedOpportunities);
      handleDialogClose();
    } catch (error) {
      console.error('Error updating opportunity:', error);
    }
  };

  return (
    <>
      {opportunities.map(opportunity => (
        <div key={opportunity._id}>
          <Card variant="outlined" style={{maxWidth:'500px',width:'100%'}} className="card" sx={{ margin: "10px 0" }} onClick={handleDialogOpen}>
            <CardContent>
              <List sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
              <ListItem sx={{ display: 'flex', alignItems: 'center'}}>
                <img src={randomImage} style={{ maxWidth: '100%', height: '250px' }} alt="Opportunity" />
              </ListItem>
                <div>
                  <ListItem disablePadding sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={opportunity.title}
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                    <List>
                      
                      <ListItem >
                        <ListItemIcon>
                          <PlaceIcon />
                        </ListItemIcon>
                        {opportunity.place}
                      </ListItem>
                    </List>
                  </Typography>
                      }
                    />
                  </ListItem>

                  <ListItem >
                    <AvatarGroup max={2}>
                    {volunteerAvatars.length > 0 &&
                        volunteerAvatars?.map((avatar, avatarIndex) => (
                          <Avatar key={avatarIndex} {...avatar} />
                        ))}
                    </AvatarGroup>
                  </ListItem>
                </div>
              </List>
            </CardContent>
          </Card>

          <Dialog open={openDetailsDialog} onClose={handleDialogClose}>
            <DialogTitle>{opportunity.title}</DialogTitle>
            <DialogContent dividers>
            <ListItem sx={{ display: 'flex', alignItems: 'center'}}>
            <img src={randomImage} style={{ maxWidth: '100%', height: '250px' }} alt="Opportunity" />
          </ListItem>
              <Typography variant="subtitle1" color="textSecondary">
                Place: {opportunity.place}
              </Typography>
              <Typography variant="body1">{opportunity.description}</Typography>
              <Typography> Category: {opportunity.category} </Typography>
              <ListItem >
          
          <AvatarGroup max={2}>
          {volunteerAvatars.length > 0 &&
                        volunteerAvatars?.map((avatar, avatarIndex) => (
                          <Avatar key={avatarIndex} {...avatar} />
                        ))}
          </AvatarGroup>
        </ListItem>        
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Close</Button>
              <Button onClick={() => handleDeleteOpportunity(opportunity._id)}>Delete</Button>
              <Button variant="contained" onClick={() => handleEditOpportunity(opportunity)}>Edit</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={openEditDialog} onClose={handleDialogClose}>
            <DialogTitle>Edit Opportunity</DialogTitle>
            <DialogContent>
              {currentOpportunity && (
                <OpportunityForm
                  opportunityData={transformOpportunityForForm(currentOpportunity)}
                  handleInputChange={(e) => {
                    const { name, value } = e.target;
                    setCurrentOpportunity({
                        ...currentOpportunity,
                        [name]: value,
                    })
                      }
                    }
                  handleSubmit={() => handleUpdateOpportunity(currentOpportunity)}
                  showForm={true}
                />
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
    </>
  );
};

export default OpportunityList;
