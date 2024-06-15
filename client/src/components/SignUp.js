// SignUp.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/signup', formData);
      console.log('Signup successful:', res.data);
      // Rediriger l'utilisateur vers une autre page ou afficher un message de confirmation
    } catch (error) {
      console.error('Error signing up:', error);
      // Afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
        <Link to="/">Back to CampaignForm</Link> {/* Bouton pour rediriger vers la page CampaignForm */}
      </form>
    </div>
  );
}

export default SignUp;
