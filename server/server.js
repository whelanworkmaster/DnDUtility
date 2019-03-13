const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var db = require('./controller/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());



db.connectToDB();

app.get('/api/getUsers', (req, res) => {
    db.getAllUsers(res);
})


app.get('/api/getUserByUsername', (req, res) => {
    db.getUserByUsername(req, res);
})


app.post('/api/addUser', (req, res) => {
    db.addUserReq(req, res);
});


app.post('/api/loginUser', (req, res) => {
    db.loginUser(req, res);
});


app.listen(port, () => console.log(`Listening on port: ${port}`));
