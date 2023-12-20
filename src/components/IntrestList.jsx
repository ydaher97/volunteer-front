
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const InterestsContainer = styled('div')({
  margin: '16px',
  // padding: '16px',
 
  borderRadius: '8px',
  // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const Title = styled(Typography)({
  marginBottom: '16px',
  color: '#333',
  fontWeight: 'bold',
});

const Ul = styled(List)({
  display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
});


const ListItemText = styled(ListItem)({
  marginBottom: '8px',
  color: 'white',
  backgroundColor: '#664DFF', 
  borderRadius: '8px',
  maxWidth: "110px",
  placeContent: 'center'
});

const InterestsList = () => {
  const interests = ['Programming', 'Cooking', 'Traveling', 'Reading', 'Fitness','Swimming'];

  return (
    <InterestsContainer>
      <Title variant="h4">My Interests</Title>
      <Ul>
        {interests.map((interest, index) => (
          <ListItemText key={index}>{interest}</ListItemText>
        ))}
      </Ul>
    </InterestsContainer>
  );
};

export default InterestsList;