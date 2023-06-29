const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

//mount on api
app.use('/api', require('./api'));
const runServer = () => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
};

runServer();
module.exports = app;;