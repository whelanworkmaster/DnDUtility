const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controller/user.controller');
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());



router.connectToDB();

app.get('/api/getUsers', (req, res) => {
    userController.getAllUsers(res);
})


app.get('/api/getUserByUsername', (req, res) => {
    userController.getUserByUsername(req, res);
})


app.post('/api/addUser', (req, res) => {
    userController.addUserReq(req, res);
});


app.post('/api/loginUser', (req, res) => {
    userController.loginUser(req, res);
});


app.listen(port, () => console.log(`Listening on port: ${port}`));
