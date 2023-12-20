import React, {useEffect,useState} from 'react'
import CalendarSlider from './CalenderSlider'
import axios from 'axios'
import Container from '@mui/material/Container';
import OpportunityCard from '../../components/OpportunityCard ';
import Typography from '@mui/material/Typography';

const CalenderPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [opportunities, setOpportunities] = useState([]);
  const [highlightedDates, setHighlightedDates] = useState([]);
  const [selectedOpportunities, setSelectedOpportunities] = useState([]);


  useEffect(() => {
    fetchOpportunities(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const clickedOpportunities = isEventDate(date);
    
    setSelectedOpportunities(clickedOpportunities);
  };

  const fetchOpportunities = async (date) => {
    try {
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const response = await axios.get(`https://volunteer-backend-b6ip.onrender.com/api/opportunities?date=${formattedDate}`);
       setOpportunities(response.data.opportunities);
  
      const highlightedDates = response.data.opportunities.map((opportunity) =>
        new Date(opportunity.startDate).toISOString().split('T')[0]
      );
      setHighlightedDates(highlightedDates);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  };

  const isEventDate = (date) => {
    const providedDate = new Date(date);
  
    return opportunities.filter((opportunity) => {
      const startDate = new Date(opportunity.startDate);
      const endDate = new Date(opportunity.endDate);
  
      return (
        startDate.getFullYear() === providedDate.getFullYear() &&
        startDate.getMonth() === providedDate.getMonth() &&
        startDate.getDate() === providedDate.getDate()
      ) || (
        endDate.getFullYear() === providedDate.getFullYear() &&
        endDate.getMonth() === providedDate.getMonth() &&
        endDate.getDate() === providedDate.getDate()
      );
    });
  };

 
  return (
    <Container className='container'>
      
      <CalendarSlider highlightedDates={highlightedDates} onDateClick={handleDateChange} />
      {selectedOpportunities.length > 0 && (
        <div>
          {/* <h3>Opportunities on {selectedDate.toDateString()}:</h3> */}
            {selectedOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          
        </div>
      )}

    {/* {selectedOpportunities.length == 0 && <Typography>No events on {selectedDate.toDateString()}</Typography>} */}

      </Container>
  )
}

export default CalenderPage