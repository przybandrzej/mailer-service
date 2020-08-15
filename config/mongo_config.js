module.exports = {
  url: 'mongodb://' + process.env.MONGO_USERNAME + '@' + process.env.MONGO_PASSWORD + process.env.MONGO_HOST + ':' + process.env.MONGO_PORT + '/' + process.env.MONGO_DBNAME,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
};
