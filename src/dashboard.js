// Dashboard.js

// import React from 'react';
import './ticket-rise.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate(); // React Router v6
    
    const [agents, setAgents] = useState([]);
    const [tickets, setTickets] = useState([]);
    
    
    useEffect(() => {
        const apiUrl = 'http://localhost:3500/support-agents';
        const apiUrl2 = 'http://localhost:3500/support-tickets';
        
   
  
      // Fetch Support Agents
      fetch(apiUrl , {
        method: 'GET',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`API Error: ${response.statusText}`);
          }
        })
        .then(data => {
          setAgents(data);
        })
        .catch(error => {
          console.error('Fetch Support Agents Error:', error.message);
        });

         // Fetch Support Agents
    fetch(apiUrl2 , {
        method: 'GET',
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error(`API Error: ${response.statusText}`);
          }
        })
        .then(data => {
          setTickets(data);
        })
        .catch(error => {
          console.error('Fetch Support Agents Error:', error.message);
        });
    }, []);

    const navigateToTicket = () => {
        console.log("CLICKED");
        navigate('/ticket-rise');
      }
      const navigateToAgent = () => {
        console.log("CLICKED");
        navigate('/support-agent');
      }



  return (
    <div className="dashboard-container">
      <h2 style={{textAlign:'center'}}>List Of Tickets</h2>
      <button style={{float:'inline-end',marginBottom:'1rem'}} className="form-button" onClick={navigateToTicket}>Create New Ticket</button>
      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Topic</th>
            <th>Description</th>
            <th>Severity</th>
            <th>Type</th>
            <th>Assigned To</th>
            <th>Resolved On</th>
            <th>Status</th>
            <th>Date Credit</th>
            
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr key={index}>
              <td>{ticket.id}</td>
              <td>{ticket.Topic}</td>
              <td>{ticket.Description}</td>
              <td>{ticket.Severity}</td>
              <td>{ticket.Type}</td>
              <td>{ticket.AssignedTo || 'NA'}</td>
              <td>{ticket.ResolvedOn}</td>
              <td>{ticket.status}</td>
              <td>{ticket.DateCreated}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 style={{textAlign:'center',marginTop:'5rem'}}>List Of Support Agents</h2>
      <button style={{float:'inline-end',marginBottom:'1rem'}} className="form-button" onClick={navigateToAgent}>Create New Agent</button>

      <table className="ticket-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agents, index) => (
            <tr key={index}>
              <td>{agents.id}</td>
              <td>{agents.Name}</td>
              <td>{agents.Email}</td>
              <td>{agents.Phone}</td>
              <td>{agents.Description}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
  );
};

export default Dashboard;
