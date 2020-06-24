const app = require('./app');
const SERVER_PORT = process.env.SERVER_PORT || 5000;

app.listen(SERVER_PORT, () => {
  console.log(`Server run on port ${SERVER_PORT}`);
});
