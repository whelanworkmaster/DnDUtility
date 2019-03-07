const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();
const config = require('./app/config/config');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());



mongoose.connect(config.db);

mongoose.connection.on('connected', function() {
    console.log('Mongoose default connection open to ' + config.db);
})

app.listen(config.port, function(err) {
    if(err) throw err;
    console.log('App listening on port ' + config.port);
})