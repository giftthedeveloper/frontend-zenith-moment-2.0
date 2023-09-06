const express = require('express');
const app = express();
const port = 5500

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/testimonies', (req, res) => {
    res.sendFile(__dirname + '/testimonies.html');
});

// app.get('/events', (req, res) => {
//     res.sendFile(__dirname + '/events.html');
// });

app.get('/feedback', (req, res) => {
    res.sendFile(__dirname + '/feedbackform.html');
});

app.listen(port, () => {
    console.log(`app is running at port ${port}`)
});