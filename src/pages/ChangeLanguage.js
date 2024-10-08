import React from 'react';

const ChangeLanguage = () => {
  return (
    <div style={styles.page}>
      <h1>Change Language</h1>
      <p>Select your preferred language.</p>
    </div>
  );
};

const styles = {
  page: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
  },
};

export default ChangeLanguage;
