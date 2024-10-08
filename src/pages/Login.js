// src/pages/Login.js
import React, { useState } from 'react';

const Login = ({ setIsLoggedIn }) => {
    const [hoveredButton, setHoveredButton] = useState(null);

    const styles = {
        body: {
            margin: 0,
            padding: 0,
            fontFamily: 'Arial, sans-serif',
            backgroundImage: 'url("https://www.tamilnadutourism.tn.gov.in/img/pages/medium-desktop/take-a-ride-in-the-toy-train-1653978188_8ac904b5bdb228abad78.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        },
        container: {
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '300px',
            textAlign: 'center',
        },
        input: {
            width: '90%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            width: '45%',
            padding: '10px',
            margin: '10px 2.5%',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: '#007BFF',
            color: 'white',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login validation (Replace with actual validation logic)
        setIsLoggedIn(true);
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        required
                        style={styles.input}
                    /><br />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        style={styles.input}
                    /><br />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        style={styles.input}
                    /><br />
                    <input
                        type="submit"
                        value="Submit"
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'submit' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => setHoveredButton('submit')}
                        onMouseLeave={() => setHoveredButton(null)}
                    />
                    <input
                        type="reset"
                        value="Reset"
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'reset' ? styles.buttonHover : {}),
                        }}
                        onMouseEnter={() => setHoveredButton('reset')}
                        onMouseLeave={() => setHoveredButton(null)}
                    />
                </form>
            </div>
        </div>
    );
};

export default Login;
