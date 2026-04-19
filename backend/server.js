<<<<<<< HEAD
require('dotenv').config();

const app = require('./src/app');

const PORT = Number(process.env.PORT) || 5001;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
  console.error('Server failed to start:', error.message);
});

module.exports = server;
=======
const app = require('./src/app');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
>>>>>>> f73c97dc910deb3815eb350256a0852f5f0f4af6
