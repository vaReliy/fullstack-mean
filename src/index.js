const app = require('./app');
const fs = require('fs');
const SERVER_PORT = process.env.PORT || 5000;

app.listen(SERVER_PORT, () => {
    console.log(`Server run on port ${SERVER_PORT}`);
});

fs.writeFile('./client/dist/client/assets/heroku.port', SERVER_PORT, (err, data) => {
    if (err) {
        return console.log(err);
    }
});
