import React from 'react';

const Additional = () => {
  const containerStyle = {
    // padding: '20px',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    // backgroundColor: '#f5f5f5',
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const textStyle = {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '10px', fontWeight: 'bold' }}>Additional</h2>
      <div style={textStyle}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga, natus libero distinctio quam,
        neque tempora tempore similique necessitatibus magnam cupiditate facilis fugiat voluptatem
        quod minus blanditiis et beatae obcaecati molestiae!
      </div>
    </div>
  );
};

export default Additional;
