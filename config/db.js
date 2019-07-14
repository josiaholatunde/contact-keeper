const {mongoDbURI} = require('./keys');
const connectDB = async () => {
  try {
    await mongoose.connect(mongoDbURI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`Successfully connected to database`)
  } catch (error) {
    console.error(error);
  }
}

module.exports = connectDB;