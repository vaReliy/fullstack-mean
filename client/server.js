const express = require('express');
const client = express();
const CLIENT_PORT = process.env.CLIENT_PORT || 443;

client.use(express.static('dist/client'));

client.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './dist/client' });
});

client.listen(CLIENT_PORT, () => {
  console.log(`Client run on port ${CLIENT_PORT}`);
});
