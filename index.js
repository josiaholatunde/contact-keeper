const express = require('express');
const mongoose = require('mongoose');
const { mongoDbURI } = require('./config/keys');

const app = express();

app.use(express.json({extended: false}));

const PORT = process.env.PORT || 9876;


app.listen(PORT, () => {
  mongoose.connect(mongoDbURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));
db.once('open', () => {
  require('./routes/users')(app);
  require('./routes/auth')(app);
  require('./routes/contacts')(app);
  console.log(`Server running on port ${PORT} 🔥`);

})