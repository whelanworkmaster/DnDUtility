const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

var dt = require('./db.js')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

app.get('/api/hello', (res) => {
    res.send({express : 'Hello From Express',
    time : dt.myDateTime()});
});

app.get('/api/heistGame', (res) => {
    res.send({express : 'A Heist game'});
});

app.post('/api/loginUser', (req, res) => {
    console.log(req.body);
    res.send(` received your POST request. This is what you sent me:  ${JSON.stringify(req.body)}`, );
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
