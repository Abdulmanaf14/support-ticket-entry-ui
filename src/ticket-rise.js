// TicketRise.js
import React, { useState } from 'react';
import './ticket-rise.css'
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';

const TicketRise = () => {
  const [formData, setFormData] = useState({
    topic: '',
    Description: '',
    Severity: '',
    Type: '',
  });

  const [tickets, setTickets] = useState([]);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    console.log('what is eeeeee', e);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  const handleSnackbar = (message, type) => {
    setSnackbar({
      open: true,
      message,
      type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const apiUrl = 'http://localhost:3500/support-tickets';



    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        console.log("response", response);
        if (response.ok) {
          handleSnackbar('Ticket created successfully', 'success');
          return response.json();
        } else {
          throw new Error(`API Error: ${response.statusText}`);
        }
      }).then(data => {
        setTickets(data);
      })
      .catch(error => {
        console.error('Fetch Tickets Error:', error.message);
      });
  };




  return (

    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>Ticket Entry System Form</h2>
        <div style={{ textAlign: '-webkit-center' }}>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <label className="form-label">
              Topic:
              <input
                type="text"
                name="topic"
                value={formData.topic}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Description
              <input
                type="text"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Severity:
              <input
                type="text"
                name="Severity"
                value={formData.Severity}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Type:
              <input
                type="text"
                name="Type"
                value={formData.Type}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>

            <button type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* Display Snackbar */}
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={handleSnackbarClose}
      />
    </div>

  );
};

export default TicketRise;
