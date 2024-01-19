import './App.css';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import TicketRise from './ticket-rise';

import SupportAgent from './support-agents';
import Dashboard from './dashboard';
import SuccessMessage from './success-box';






function App() {
  return (
 <Router>
      <Routes>
        {/* Other routes can go here */}
        <Route path="/ticket-rise" element={<TicketRise />} />
        <Route  path="/support-agent" element={<SupportAgent />} />
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route index element={<SupportAgent />} />        
      </Routes>
    </Router>

    
    

  );
}

export default App;
