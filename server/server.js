const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./model/user.model');
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
    let username = req.body.username;
    let password = req.body.password;
    
    var BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashPassword) {
            let newUser = new User({
                username: username, 
                password: hashPassword
            });
        
            User.findOne({"username" : username}, function(err, user) {
                if(user != null) {
                    res.send('User already exists');
                } else {
                    newUser.save()
                    .then(newUser => {
                        res.status(200).json({'newUser': 'new User added successfully'});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(400).send('adding new User failed ');
                    });
                }
            })
    });
});

app.post('/api/loginUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({"username" : username}, function(err, user) {
        if(user != null) {
            bcrypt.compare(password, user.password, function(err, isSame) {
                if(!isSame) {
                    res.status(403).send("Username or password not found");
                } else {
                    res.status(200).send("User authenticated correctly");
                }
            });
        } else {
            res.status(403).send("Username or password not found");
        }
    })
    .catch(function(error){
        console.log("Error authenticating user: ");
        console.log(error);
        next();
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
