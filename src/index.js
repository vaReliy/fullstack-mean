const app = require('./app');

app.listen(PORT, () => {
  console.log(`Server run on port ${process.env.SERVER_PORT || 5000}`);
});
