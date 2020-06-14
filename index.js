require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const bodyParser = require('body-parser')
const { mongoDbURI, passportCookieKey } = require('./config/keys');
const cookieSession = require('cookie-session')
const passport = require('passport')
const cors = require('cors')
require('./services/googlePassportStrategy')
const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const PORT = process.env.PORT || 9876;

app.use(
  cookieSession({
    // how long the cookie with exist before it effectively expires
    maxAge:  1 * 60 * 60 * 1000,
    // key(s) to be used to sign or encrypt the cookie
    // if multiple keys are given, express will pick and use one to
    // encrypt the cookie
    keys: [passportCookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: 'GET,PUT,POST,PATCH,DELETE,OPTIONS'
}))


app.listen(PORT, () => {
  mongoose.connect(mongoDbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {
  require('./routes/users')(app);
  require('./routes/auth')(app);
  require('./routes/contacts')(app);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
  }
  console.log(`Server running on port ${PORT} 🔥`);

})