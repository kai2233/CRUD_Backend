const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!')
});



const runServer = () => {
    app.listen(port, () => {
        console.log(`server is running on port ${port}`)
    })
};

runServer();
module.exports = app;;