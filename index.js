const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const { mongoDbURI } = require('./config/keys');

const app = express();

app.use(express.json({extended: false}));

const PORT = process.env.PORT || 9876;


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