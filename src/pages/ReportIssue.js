import React, { useState } from 'react';
import axios from 'axios';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    description: '',
    screenshot: null,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, screenshot: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.screenshot) {
      data.append('screenshot', formData.screenshot);
    }

    try {
      await axios.post('http://localhost:5000/api/report', data); // Replace with your backend URL
      setMessage('Issue reported successfully.');
    } catch (error) {
      setMessage('Failed to report issue. Please try again.');
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>Report Issue/Emergency</h1>
      <p style={styles.description}>Please fill out the form below to report an issue or emergency.</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name (optional):</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email (optional):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Issue Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">Select a category</option>
            <option value="navigation">Navigation Issue</option>
            <option value="map">Map Inaccuracy</option>
            <option value="app">App Crash</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Screenshot (optional):</label>
          <input
            type="file"
            name="screenshot"
            onChange={handleFileChange}
            style={styles.inputFile}
          />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  page: {
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    minHeight: '100px',
  },
  inputFile: {
    fontSize: '16px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#28a745',
  },
};

export default ReportIssue;
