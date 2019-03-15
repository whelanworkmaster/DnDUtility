const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controller/user.controller');
const noteController = require('./controller/note.controller');
const router = require('./routes/router');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());



router.connectToDB(function(){});

app.get('/api/getUsers', (req, res) => {
    userController.getAllUsers(res);
});


app.get('/api/getUserByUsername', (req, res) => {
    userController.getUserByUsername(req, res);
});


app.post('/api/addUser', (req, res) => {
    userController.addUserReq(req, res);
});


app.post('/api/loginUser', (req, res) => {
    userController.loginUser(req, res);
});


app.get('/api/getNotes', (req, res) => {
    noteController.getAllNotes(res);
});


app.get('/api/getNoteByUsername', (req, res) => {
    noteController.getNoteByUsername(req, res);
});


app.post('/api/addNote', (req, res) => {
    noteController.addNoteReq(req, res);
});


app.post('/api/updateNote', (req, res) => {
    noteController.updateNote(req, res);
});


app.listen(port, () => console.log(`Listening on port: ${port}`));
