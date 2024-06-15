import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom

function CampaignForm() {
  const [status, setStatus] = useState('');
  const [response, setResponse] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const res = await axios.get('http://localhost:3000/auth/status');
        setIsAuthenticated(res.data.isAuthenticated);
      } catch (error) {
        console.error('Error checking authentication', error);
      }
    };
    checkAuthentication();
  }, []);

  const handleChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return alert('You must be logged in to post an ad');
    }
    try {
      const res = await axios.post('http://localhost:3000/api/twitterAd', { status });
      setResponse(res.data);
    } catch (error) {
      console.error('Error posting ad', error);
    }
  };

  return (
    <div>
      <h2>Create a Twitter Ad</h2>
      {isAuthenticated ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ad Text</label>
            <input type="text" value={status} onChange={handleChange} required />
          </div>
          <button type="submit">Post Ad</button>
        </form>
      ) : (
        <div>
          <p>Please log in to post an ad.</p>
          <Link to="/login">Login</Link> {/* Bouton pour rediriger vers la page de connexion */}
          <br />
          <Link to="/sign_up">Sign Up</Link> {/* Bouton pour rediriger vers la page de sign up */}
        </div>
      )}
      {response && <div>Ad Posted: {JSON.stringify(response)}</div>}
    </div>
  );
}

export default CampaignForm;
