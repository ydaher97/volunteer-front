import React from 'react';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

const OpportunityForm = ({
  opportunityData,
  handleInputChange,
  handleSubmit,
  showForm,
}) => {
  const { title, place, description, startDate, endDate, long, lat, category } =
    opportunityData;
    
    const categoryOptions = [
      { id: 1, label: 'Health' },
      { id: 2, label: 'Education' },
      { id: 3, label: 'Environment' },
      { id: 4, label: 'Community' },
    ];
 
  return (
    <div>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: showForm ? 'block' : 'none',
          '& > :not(style)': { m: 1, width: '100%' },
        }}
      >
        <TextField
          label="Title"
          type="text"
          name="title"
          value={title}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Place"
          type="text"
          name="place"
          value={place}
          onChange={handleInputChange}
          required
        />
       <TextField
          label="Longitude"
          type="number"
          name="long"
          value={long}
          onChange={handleInputChange}
          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          required
        />
        <TextField
          label="Latitude"
          type="number"
          name="lat"
          value={lat}
          onChange={handleInputChange}
          // inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          required
        />
          <FormControl fullWidth required>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={category}
            name="category"
            onChange={handleInputChange}
          >
            {categoryOptions.map((option) => (
              <MenuItem key={option.id} value={option.label}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextareaAutosize
          aria-label="minimum height"
          minRows={3}
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleInputChange}
          required
        />
        <TextField
          label="Start Date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ width: '100%' }}
        />
        <TextField
          label="End Date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleInputChange}
          required
          InputLabelProps={{ shrink: true }}
          sx={{ width: '100%' }}
        />
        <Button variant="contained" type="submit">
          Create Opportunity
        </Button>
      </Box>
    </div>
  );
};

export default OpportunityForm;
