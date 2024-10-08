// src/Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.sidebar}>
      <h3 style={styles.header}>Options</h3>
      <ul style={styles.list}>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/login')}>
            Login
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/')}>
            Home
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/map')}>
            Map
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/change-language')}>
            Change Language
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/track-my-train')}>
            Track My Train
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/medical-emergency')}>
            Medical Emergency
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/nearby-transport')}>
            Nearby Public Transport
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/report-issue')}>
            Report Issue
          </button>
        </li>
        <li>
          <button style={styles.button} onClick={() => handleNavigation('/FeedbackPage')}>
            FeedbackPage
          </button>
        </li>
      </ul>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '250px',
    padding: '20px',
    backgroundColor: '#343a40',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    height: '100vh',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
  },
  header: {
    fontSize: '20px',
    marginBottom: '20px',
    color: '#ffc107',
    borderBottom: '2px solid #ffc107',
    paddingBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  button: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#343a40',
    backgroundColor: '#ffc107',
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

export default Sidebar;
