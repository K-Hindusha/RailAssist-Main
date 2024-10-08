import React, { useState } from 'react';
import SimpleMap from '../map'; // Adjust the path based on your directory structure

const styles = {
  page: {
    fontFamily: 'Arial, sans-serif',
    margin: 0,
    padding: 0,
    backgroundColor: '#f0f0f0',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    backgroundColor: '#007bff',
    color: 'white',
    textAlign: 'center',
    padding: '20px 0',
  },
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  mapContainer: {
    width: '100%',
    height: '80vh',
  },
  searchContainer: {
    padding: '10px',
    textAlign: 'center',
  },
  searchInput: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '200px',
    marginRight: '10px',
  },
  searchButton: {
    padding: '10px',
    fontSize: '16px',
    color: 'white',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

const NearbyTransport = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTransport, setSelectedTransport] = useState(null);

  const handleSearch = () => {
    // Set the selected transport as the search query
    setSelectedTransport(searchQuery);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>Nearby Public Transport</h1>
      </div>

      <div style={styles.container}>
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search for a transport"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button onClick={handleSearch} style={styles.searchButton}>
            Search
          </button>
        </div>
        <div style={styles.mapContainer}>
          <SimpleMap destination={selectedTransport} />
        </div>
      </div>
    </div>
  );
};

export default NearbyTransport