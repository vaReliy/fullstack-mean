const app = require('./app');
const SERVER_PORT = process.env.PORT || 4202;

app.listen(SERVER_PORT, () => {
    console.log(`Server run on port ${SERVER_PORT}`);
});
