const express = require('express'),
      bodyParser = require('body-parser'),
      qanda = require('../api/qanda.json')

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('welcome to The Simpsons API')
});

app.get('/questions', (req, res) => {
    res.json(qanda)
});

app.listen(port, () => {
    console.log('running on port: ' + port)
});

module.exports = app;
