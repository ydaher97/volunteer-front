 function stringToColor(string) {
  let hash = 0;
  let i;

 
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}


export const transformOpportunityForForm = (opportunity) => {
  const {
    description,
    title,
    place,
    startDate,
    endDate,
    volunteers,
    organization,
    category,
    lat,
    long
  } = opportunity;
  
  const transformedOpportunity = {
    title: title || '',
    description: description || '',
    place: place || '',
    category: category,
    startDate: startDate ? new Date(startDate).toISOString().split('T')[0] : '',
    endDate: endDate ? new Date(endDate).toISOString().split('T')[0] : '',
    long: location.coordinates ? location.coordinates[0] : 0,
    lat: location.coordinates ? location.coordinates[1] : 0,
    volunteers: volunteers || [],
    organization: organization || '',
  };

  return transformedOpportunity;
};


export const getImageUrl = (path) =>{
  return new URL(`/public/${path.substring(path.lastIndexOf('/') + 1)}`, import.meta.url).href;
};