// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

 // Ensure you have this image in the correct directory

const Home = () => {
  const navigate = useNavigate();

  const goToMap = () => {
    navigate('/map');
  };

  return (
    <div style={{ ...styles.home, backgroundImage: `url(${'https://www.gannett-cdn.com/-mm-/c5c20519e67a809a95aae88c9a1c0ea2f63930a6/c=0-95-958-636/local/-/media/2018/04/23/USATODAY/USATODAY/636600838705972040-Amtrak-Passenger-Cars-For-USA-Today-Image-15-Amtrak-owned.jpg?width=3200&height=1680&fit=crop'})` }}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Welcome to the Railway Navigation System</h1>
        <p style={styles.subtitle}>Click below to view the map.</p>
        <button style={styles.button} onClick={goToMap}>
          Go to Map
        </button>
      </div>
    </div>
  );
};

const styles = {
  home: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '40px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '20px',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '20px',
    fontWeight: 'bold',
    backgroundColor: '#ffc107',
    color: '#343a40',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  buttonHover: {
    backgroundColor: '#e0a800',
  },
  buttonActive: {
    transform: 'scale(0.98)',
  },
};

export default Home;
