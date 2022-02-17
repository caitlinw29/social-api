const { connect, connection } = require('mongoose');

connect('mongodb://localhost/socialapiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;