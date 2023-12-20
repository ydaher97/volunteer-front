// OrganizationDetails.js
import React from 'react';


const OrganizationDetails = ({organization}) => {
 

  
  if (!organization) {
    return <div>Loading...</div>;
  }
console.log(organization.organization.name)
  return (
    <div>
      <h3>{organization.organization.name}</h3>
     
      <p>Address: {organization.organization.location}</p>
      <p>Description: {organization.organization.description}</p>
      
    </div>
  );
};

export default OrganizationDetails;
