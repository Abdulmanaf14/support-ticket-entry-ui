// TicketRise.js
import React, { useState } from 'react';
import './ticket-rise.css'
import { useNavigate } from 'react-router-dom';
import Snackbar from './Snackbar';
import TicketRise from './ticket-rise';





const SupportAgent = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Phone: '',
    Description: '',
  });
  const [agents, setAgents] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
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


    console.log("gfgfgf", formData);
    const apiUrl = 'http://localhost:3500/support-agents';



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
        setAgents(data);
      })
      .catch(error => {
        handleSnackbar(`API Error: ${error.message}`, 'error');
      });



  }

  return (
    <div className="container">
      <div className="form-container">
        <h2 style={{ textAlign: 'center' }}>Register Agent</h2>
        <div style={{ textAlign: '-webkit-center' }}>
          <form onSubmit={handleSubmit} style={{ width: '80%' }}>
            <label className="form-label">
              Name:
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Email:
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Phone:
              <input
                type="number"
                name="Phone"
                value={formData.Phone}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label className="form-label">
              Description:
              <input
                type="text"
                name="Description"
                value={formData.Description}
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

export default SupportAgent;
