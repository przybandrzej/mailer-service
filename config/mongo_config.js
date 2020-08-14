module.exports = {
  url: 'mongodb://' + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  username: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD
};
