const express = require('express');

const client = express();

client.use(express.static('dist/client'));

client.get('/*', (req, res) => {
  res.sendFile('index.html', { root: './dist/client' });
});

client.listen(process.env.PORT || 4202);
