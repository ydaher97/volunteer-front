import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { stringAvatar } from '../utilis/string-munpulation';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useAuth } from '../providers/authCotext';
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
import AccessTimeIcon from '@mui/icons-material/AccessTime'; 
import PlaceIcon from '@mui/icons-material/Place'; 


const imageUrls = [
  '../../public/volunteering.jpg',
  '../../public/kids.jpg',
  '../../public/images.png',
  '../../public/Volunteer_kate1.webp'
];

const OpportunityCard = ({ opportunity }) => {
  const { token } = useAuth();
  const [openDialog, setOpenDialog] = useState(false);
  const [isVolunteered, setIsVolunteered] = useState(opportunity.volunteers.includes(token));
  const [randomImage, setRandomImage] = useState('');
  const [volunteerAvatars, setVolunteerAvatars] = useState([]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    setRandomImage(imageUrls[randomIndex]);
  }, []);

  useEffect(() => {
    const fetchVolunteerAvatars = async () => {
      try {
        const usersData = await Promise.all(
          opportunity.volunteers.map(async (volunteerId) => {
            const response = await axios.get(`http://localhost:8080/api/users/${volunteerId}`);
            return response.data;
          })
        );
        const avatars = usersData.map((user) => stringAvatar(`${user.firstName} ${user.lastName}`));
        setVolunteerAvatars(avatars);
      } catch (error) {
        console.error('Error fetching volunteer avatars:', error);
      }
    };

    fetchVolunteerAvatars();
  }, [opportunity.volunteers]);


  const handleVolunteerClick = async () => {
    console.log(opportunity._id);
    try {
      const updatedOpportunity = await axios.put(
        `http://localhost:8080/api/opportunities/${opportunity._id}`,
        { userId: token }
      );

      console.log('Updated Opportunity:', updatedOpportunity.data);
      setIsVolunteered(true); 
    } catch (error) {
      console.error('Error volunteering:', error);
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const formattedDate = new Date(opportunity.startDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return ( 
    <>
      <Card style={{width:'100%',maxWidth:'500px'}}  variant="outlined" className="card" sx={{margin:"10px 0" }} onClick={handleDialogOpen}>
        <CardContent>
          <List sx={{ width: '100%', display: 'flex', alignItems: 'center' ,'@media (max-width: 768px)': {
            flexDirection: 'column',
          } }}>
          <ListItem sx={{ display: 'flex', alignItems: 'center'}}>
            <img src={randomImage} style={{ maxWidth: '100%', height: '250px' }} alt="Opportunity" />
          </ListItem>
            <div style={{width:'100%'}}>
            <ListItem disablePadding sx={{ flexGrow: 1 }}>
              <ListItemText
                primary={opportunity.title}
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    <List>
                      <ListItem >
                        <ListItemIcon>
                          <AccessTimeIcon />
                        </ListItemIcon>
                        {formattedDate}
                      </ListItem>
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
              <Button
              sx={{backgroundColor: '#664DFF'}}
                variant="contained"
                onClick={handleVolunteerClick}
                disabled={isVolunteered}
              >
                {isVolunteered ? 'Volunteered' : 'Volunteer'}
              </Button>
            </ListItem>
            <ListItem >
              <AvatarGroup max={2}>
              {volunteerAvatars.map((avatar, index) => (
              <Avatar key={index} {...avatar} />
            ))}
              </AvatarGroup>
            </ListItem>
            </div>
          </List>
        </CardContent>
      </Card>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>{opportunity.title}</DialogTitle>
        <DialogContent dividers>
          <Typography variant="subtitle1" color="textSecondary">
          <ListItem sx={{ display: 'flex', alignItems: 'center'}}>
            <img src={randomImage} style={{ maxWidth: '100%', height: '250px' }} alt="Opportunity" />
          </ListItem>
          <Typography> Place: {opportunity.place} </Typography>
          <Typography> Category: {opportunity.category} </Typography>
          </Typography>
          <ListItem >
          
              <AvatarGroup max={4}>
              {volunteerAvatars.map((avatar, index) => (
              <Avatar key={index} {...avatar} />
            ))}
              </AvatarGroup>
            </ListItem>
          <Typography variant="body1">Describtion:{opportunity.description}</Typography>
          <Button
            variant="contained"
            onClick={handleVolunteerClick}
            disabled={isVolunteered}
          >
            {isVolunteered ? 'Volunteered' : 'Volunteer'}
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OpportunityCard;
