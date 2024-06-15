const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const Stripe = require('stripe');
const stripe = Stripe('YOUR_STRIPE_SECRET_KEY');
const Twit = require('twit');

router.post('/register', async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const user = new User({ email, password, username });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.status(200).json({ message: 'Logged in', user: req.user });
});

router.post('/pay', async (req, res) => {
  const { token } = req.body;
  const charge = await stripe.charges.create({
    amount: 5000, // Amount in cents
    currency: 'usd',
    description: 'Twitter Ad Service',
    source: token.id,
  });

  if (charge.status === 'succeeded') {
    req.user.isPaid = true;
    await req.user.save();
    res.status(200).json({ message: 'Payment successful' });
  } else {
    res.status(500).json({ message: 'Payment failed' });
  }
});

router.post('/api/twitterAd', async (req, res) => {
  if (!req.isAuthenticated() || !req.user.isPaid) {
    return res.status(401).json({ error: 'User not authenticated or not paid' });
  }
  const { status } = req.body;
  const T = new Twit({
    consumer_key: 'YOUR_TWITTER_CONSUMER_KEY',
    consumer_secret: 'YOUR_TWITTER_CONSUMER_SECRET',
    access_token: req.user.token,
    access_token_secret: req.user.tokenSecret,
  });

  try {
    const tweet = await T.post('statuses/update', { status });
    res.status(200).json(tweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/auth/status', (req, res) => {
  res.json({ isAuthenticated: req.isAuthenticated() });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
