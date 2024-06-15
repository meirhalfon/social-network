import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Payment from './components/Payment';
import CampaignForm from './components/CampaignForm';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<CampaignForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path='/sign_up' element={<SignUp />} />
        </Routes>
    </Router>
  );
}

export default App;
