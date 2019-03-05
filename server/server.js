const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcrypt');
const User = require('./login/user.model.js');

const app = express();
const port = process.env.PORT || 5000;

var db = require('./login/db.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());

app.get('/api/hello', (res) => {
    res.send({express : 'Hello From Express'})
});

app.get('/api/getUsers', (req, res) => {
    User.find(function(err, users) {
        if(err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
})

app.post('/api/addUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    db.connectToDB();

    var BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hashPassword) {
            let newUser = new User({
                user_name: username, 
                user_password: hashPassword
            });
        
            newUser.save()
                .then(newUser => {
                    res.status(200).json({'newUser': 'new User added successfully'});
                })
                .catch(err => {
                    res.status(400).send('adding new User failed');
            });
    });
    
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
