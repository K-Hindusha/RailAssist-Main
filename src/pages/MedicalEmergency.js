import React, { useState } from 'react';
import SimpleMap from '../map'; // Import the SimpleMap component

const MedicalEmergency = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);
  const [isActionPopupVisible, setIsActionPopupVisible] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [name, setName] = useState('');
  const [urgency, setUrgency] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [report, setReport] = useState('');
  const [reportSentMessage, setReportSentMessage] = useState('');

  const handleInitialYes = () => {
    setIsPopupVisible(false);
    setIsActionPopupVisible(true);
  };

  const handleInitialNo = () => {
    setIsPopupVisible(false);
    alert('Have a great and safe journey! Call 123-456-7890 for assistance.');
    setIsMapVisible(true);
  };

  const showReportPage = () => {
    setIsActionPopupVisible(false);
    setIsReportVisible(true);
  };

  const showMap = () => {
    setIsActionPopupVisible(false);
    setIsMapVisible(true);
  };

  const submitReport = () => {
    if (!name || !urgency || !incidentDetails) {
      alert('Please fill out all fields.');
      return;
    }

    // Create report HTML
    const generatedReport = `
      <h2>Emergency Report</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Urgency:</strong> ${urgency}</p>
      <p><strong>Incident Details:</strong> ${incidentDetails}</p>
    `;

    // Update report state and message
    setReport(generatedReport);
    setReportSentMessage('Your report has been sent to the TTR and authorities.');
    setIsConfirmationVisible(true);
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    },
    popup: {
      backgroundColor: '#f8d7da',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    actionPopup: {
      backgroundColor: '#fff3cd',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    reportSection: {
      backgroundColor: '#d1ecf1',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    mapContainer: {
      height: '400px',
      marginTop: '20px',
      borderRadius: '8px',
      overflow: 'hidden',
    },
    confirmation: {
      backgroundColor: '#d4edda',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      marginTop: '20px',
    },
    header: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    text: {
      fontSize: '16px',
      marginBottom: '10px',
    },
    label: {
      display: 'block',
      margin: '10px 0',
    },
    input: {
      width: '100%',
      padding: '8px',
      margin: '8px 0',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer',
      margin: '10px',
    },
  };

  return (
    <div style={styles.container}>
      {isPopupVisible && (
        <div style={styles.popup}>
          <h2>Medical Emergency Assistance</h2>
          <p>Are you in need of medical assistance?</p>
          <button style={styles.button} onClick={handleInitialYes}>
            Yes
          </button>
          <button style={styles.button} onClick={handleInitialNo}>
            No
          </button>
        </div>
      )}

      {isActionPopupVisible && (
        <div style={styles.actionPopup}>
          <h2>Select an Action</h2>
          <button style={styles.button} onClick={showReportPage}>
            Report an Incident
          </button>
          <button style={styles.button} onClick={showMap}>
            Locate Nearest Hospital
          </button>
        </div>
      )}

      {isReportVisible && (
        <div style={styles.reportSection}>
          <h2>Report an Incident</h2>
          <label style={styles.label}>
            Name:
            <input
              style={styles.input}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label style={styles.label}>
            Urgency Level:
            <select
              style={styles.input}
              value={urgency}
              onChange={(e) => setUrgency(e.target.value)}
            >
              <option value="">Select urgency</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </label>
          <label style={styles.label}>
            Incident Details:
            <textarea
              style={styles.input}
              value={incidentDetails}
              onChange={(e) => setIncidentDetails(e.target.value)}
            ></textarea>
          </label>
          <button style={styles.button} onClick={submitReport}>
            Submit Report
          </button>
        </div>
      )}

      {isMapVisible && (
        <div style={styles.mapContainer}>
          <SimpleMap /> {/* Display the map */}
        </div>
      )}

      {isConfirmationVisible && (
        <div style={styles.confirmation}>
          <h2 style={styles.header}>Report Sent</h2>
          <p style={styles.text}>{reportSentMessage}</p>
          {/* Display the report directly from the state */}
          <div dangerouslySetInnerHTML={{ __html: report }} />
        </div>
      )}
    </div>
  );
};

export default MedicalEmergency;
