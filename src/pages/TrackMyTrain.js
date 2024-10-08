import React from 'react';

const TrackMyTrain = () => {
  return (
    <div style={styles.page}>
      <iframe 
        src="https://www.trainman.in/"
        style={styles.iframe}
        title="Track My Train"
      ></iframe>
    </div>
  );
};

const styles = {
  page: {
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100vw',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 'none',
  },
};

export default TrackMyTrain;
