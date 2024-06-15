const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/twitterAdPlatform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

require('./config/passport')(passport);

app.use(cors());
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
