// import React, { useState, useEffect } from 'react';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/DatePicker';
//  import AdapterDateFns from '@mui/x-date-utils/AdapterDateFns'; 
// import axios from 'axios';
// import './calendar.css';

// const MyCalendar = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [opportunities, setOpportunities] = useState([]);

//   useEffect(() => {
//     fetchOpportunities(selectedDate);
//   }, [selectedDate]);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const fetchOpportunities = async (date) => {
//     try {
//       const formattedDate = date.toISOString().split('T')[0];
//       const response = await axios.get(`http://localhost:8080/api/opportunities?date=${formattedDate}`);
//       setOpportunities(response.data.opportunities);
//     } catch (error) {
//       console.error('Error fetching opportunities:', error);
//     }
//   };

//   const isEventDate = (date) => {
//     const formattedDate = date.toISOString().split('T')[0];
//     return opportunities.some((opportunity) => {
//       return opportunity.startDate === formattedDate || opportunity.endDate === formattedDate;
//     });
//   };

//   const renderDay = (day, _value, _dayComponentProps) => {
//     const dayFormatted = day.toISOString().split('T')[0];
//     const hasEvent = isEventDate(day);
//     return (
//       <div className={`calendar-day ${hasEvent ? 'highlighted-date' : ''}`}>
//         <span>{dayFormatted}</span>
//       </div>
//     );
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <DatePicker
//         value={selectedDate}
//         onChange={(date) => handleDateChange(date)}
//         renderDay={renderDay}
//       />
//       <div>
//         {opportunities.map((opportunity) => (
//           <div key={opportunity._id}>
//             <p>{opportunity.title}</p>
//             {/* Display other opportunity details */}
//           </div>
//         ))}
//       </div>
//     </LocalizationProvider>
//   );
// };

// export default MyCalendar;
