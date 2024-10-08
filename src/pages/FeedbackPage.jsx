import React, { useState } from 'react';

// Define styles as an object
const styles = {
    body: {
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        backgroundColor: '#f9f9f9',
    },
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    h1: {
        color: '#333',
    },
    p: {
        color: '#333',
    },
    formGroup: {
        marginBottom: '15px',
    },
    label: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    textarea: {
        height: '150px',
        resize: 'vertical',
    },
    radioGroup: {
        marginRight: '5px',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
    error: {
        color: 'red',
        fontSize: '0.875em',
    },
    response: {
        marginTop: '20px',
        fontWeight: 'bold',
    },
};

const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedbackType: '',
        feedbackMessage: '',
        rating: '',
        attachments: null,
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.feedbackMessage) newErrors.feedbackMessage = 'Feedback message is required';
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Mock form submission
        setTimeout(() => {
            setResponseMessage('Thank you for your feedback! We appreciate your time and input.');
            setErrors({});
        }, 1000);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>We Value Your Feedback</h1>
            <p style={styles.p}>Please share your thoughts and experiences with us.</p>
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Enter your name" 
                        style={styles.input}
                    />
                    {errors.name && <p style={styles.error}>{errors.name}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Enter your email address" 
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="feedback-type" style={styles.label}>Type of Feedback</label>
                    <select 
                        id="feedback-type" 
                        name="feedbackType" 
                        value={formData.feedbackType} 
                        onChange={handleChange} 
                        required
                        style={styles.input}
                    >
                        <option value="">Select feedback type</option>
                        <option value="General">General Feedback</option>
                        <option value="TrainExperience">Train Experience</option>
                        <option value="BookingProcess">Booking Process</option>
                        <option value="StationFacilities">Station Facilities</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="feedback-message" style={styles.label}>Your Feedback</label>
                    <textarea 
                        id="feedback-message" 
                        name="feedbackMessage" 
                        value={formData.feedbackMessage} 
                        onChange={handleChange} 
                        placeholder="Please enter your feedback here" 
                        required
                        style={styles.input, styles.textarea}
                    />
                    {errors.feedbackMessage && <p style={styles.error}>{errors.feedbackMessage}</p>}
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Rating</label>
                    <div>
                        <input 
                            type="radio" 
                            id="rating-1" 
                            name="rating" 
                            value="1" 
                            checked={formData.rating === '1'}
                            onChange={handleChange}
                            style={styles.radioGroup}
                        />
                        <label htmlFor="rating-1">⭐</label>
                        <input 
                            type="radio" 
                            id="rating-2" 
                            name="rating" 
                            value="2" 
                            checked={formData.rating === '2'}
                            onChange={handleChange}
                            style={styles.radioGroup}
                        />
                        <label htmlFor="rating-2">⭐⭐</label>
                        <input 
                            type="radio" 
                            id="rating-3" 
                            name="rating" 
                            value="3" 
                            checked={formData.rating === '3'}
                            onChange={handleChange}
                            style={styles.radioGroup}
                        />
                        <label htmlFor="rating-3">⭐⭐⭐</label>
                        <input 
                            type="radio" 
                            id="rating-4" 
                            name="rating" 
                            value="4" 
                            checked={formData.rating === '4'}
                            onChange={handleChange}
                            style={styles.radioGroup}
                        />
                        <label htmlFor="rating-4">⭐⭐⭐⭐</label>
                        <input 
                            type="radio" 
                            id="rating-5" 
                            name="rating" 
                            value="5" 
                            checked={formData.rating === '5'}
                            onChange={handleChange}
                            style={styles.radioGroup}
                        />
                        <label htmlFor="rating-5">⭐⭐⭐⭐⭐</label>
                    </div>
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="attachments" style={styles.label}>Attach Files (Optional)</label>
                    <input 
                        type="file" 
                        id="attachments" 
                        name="attachments" 
                        onChange={handleChange} 
                    />
                </div>
                <div style={styles.formGroup}>
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
                    >
                        Submit Feedback
                    </button>
                </div>
            </form>
            {responseMessage && <div style={styles.response}>{responseMessage}</div>}
        </div>
    );
};

export default FeedbackPage;