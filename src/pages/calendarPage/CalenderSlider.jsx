import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Paper, Typography } from '@mui/material';
import './calendar.css'; 


const CalendarSlider = ({ highlightedDates, onDateClick }) => {
  const today = new Date();
  const settings = {
    dots: false,
    infinite: false, 
    speed: 500,
    slidesToShow: 16,
    slidesToScroll: 15,
    centerMode: false,
    variableWidth: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          centerMode: false,
          variableWidth: false,
        },
      },
    ],
  };

  const handleDateClick = (selectedDate) => {
    if (onDateClick) {
      onDateClick(selectedDate);
    }
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; 

  const generateDates = () => {
    const dates = [];
    const totalDaysToShow = 90;

    for (let i = 0; i < totalDaysToShow; i++) {
      const currentDate = new Date(today.getTime() + (i * 24 * 60 * 60 * 1000)); 
      const marginRight = i < totalDaysToShow - 1 ? '8px' : '0'; 
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      const isHighlighted = highlightedDates.includes(currentDate.toISOString().split('T')[0]);
        
      dates.push(
        <Paper
          key={i}
          className={`${isHighlighted ? 'highlighted' : 'calendar-day'}`}
          onClick={() => handleDateClick(currentDate.toDateString()) }
          style={{ marginRight }} 
        >
          <Typography variant="body1">{currentDate.getDate()}</Typography>
          <Typography variant="caption">{dayOfWeek}</Typography>  

        </Paper>
      );
    }

    return dates;
  };

  return (
    <div className="calendar-slider">
      <Typography variant="h6" component="h2" style={{marginBottom:"32px"}}>Calendar</Typography>
      <br />
      <div className="slider-container">
      <Slider {...settings} className="slider">
          {generateDates()}
        </Slider>
      </div>
    </div>
  );
};

export default CalendarSlider;
