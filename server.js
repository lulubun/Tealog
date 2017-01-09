var express = require('express');
var app = express();
//let mongoose = require('mongoose');
//let morgan = require('morgan');
//let bodyParser = require('body-parser');

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

/*mongoose.connect(config.DBHost, options);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
    //use morgan to log at command line
    app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

app.get("/", (req, res) => res.json({message: "App is listening"}));

module.exports = app; // for testing
