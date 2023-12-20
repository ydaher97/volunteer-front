import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, TextareaAutosize } from '@mui/material';

const OrganizationForm = ({ open, handleClose }) => {
  const [organizationData, setOrganizationData] = useState({
    name: '',
    description: '',
    location: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganizationData({ ...organizationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post('https://volunteer-backend-b6ip.onrender.com/api/organizations', organizationData, config);

      if (response.status === 201) {
        console.log('Organization created successfully');
        handleClose(); // Close the dialog after successful submission
      } else {
        console.error('Failed to create organization');
      }
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Organization</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            type="text"
            name="name"
            value={organizationData.name}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextareaAutosize
            label="Description"
            name="description"
            value={organizationData.description}
            onChange={handleChange}
            rowsMin={4}
            placeholder="Description"
            style={{ width: '100%', marginTop: '16px', marginBottom: '16px' }}
          />
          <TextField
            label="Location"
            type="text"
            name="location"
            value={organizationData.location}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contact"
            type="text"
            name="contact"
            value={organizationData.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <DialogActions>
            <Button type="submit">Create</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrganizationForm;
