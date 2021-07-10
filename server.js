const app = require('./app');
const dotenv = require('dotenv').config();

const port = process.env.PORT || 30000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
