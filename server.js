const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const {DATABASE_URL, PORT} = require('./config');
const {Entries}= require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.json('hello world');
});

app.get('/entries', (req, res) => {
  Entry
    .find()
    .exec()
    .then(entries => {
      res.json(entry.map(entry => entry.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.get('/entries/:id', (req, res) => {
  Entry
    .findById(req.params.id)
    .exec()
    .then(entry => res.json(entry.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went wrong'});
    });
});

app.post('/entries', (req, res) => {
  const requiredFields = ['teaName', 'date'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `Missing "${field}" in request body`});
    }});

  var vendor = req.body.vendor ? req.body.vendor : '';
  var teaType = req.body.teaType ? req.body.teaType : {};
  var teaColor = teaType.teaColor ? teaType.teaColor : '';
  var flavored = teaType.flavored ? teaType.flavored : false;
  var amountUsed = req.body.amountUsed ? req.body.amountUsed : '';
  var waterUsed = req.body.waterUsed ? req.body.waterUsed : '';
  var brewTemp = req.body.brewTemp ? req.body.brewTemp : '212 (rolling boil)';
  var steepingTime = req.body.steepingTime ? req.body.steepingTime : '';
  var additions = req.body.additions ? req.body.additions : {};
  var cream = additions.cream ? additions.cream : false;
  var sugar = additions.sugar ? additions.sugar : '';
  var honey = additions.honey ? additions.honey : false;
  var lemon = additions.lemon ? additions.lemon : false;
  var other = additions.other ? additions.other : '';
  var aroma = req.body.aroma ? req.body.aroma : '';
  var taste = req.body.taste ? req.body.taste : '';
  var stars = req.body.stars ? req.body.stars : 0;
  var notes = req.body.notes ? req.body.notes : '';


  Entry
    .create({
    	teaName: req.body.teaName,
    	date: req.body.date,
    	vendor: vendor,
    	teaType: {
    		teaColor: teaColor,
    		flavored: flavored
    	},
    	amountUsed: amountUsed,
    	waterUsed: waterUsed,
    	brewTemp: brewTemp,
    	steepingTime: steepingTime,
    	additions: {
    		cream: cream,
    		sugar: sugar,
    		honey: honey,
    		lemon: lemon,
    		other: other
    	},
    	aroma: aroma,
    	taste: taste,
    	stars: stars,
    	notes: notes
    })
    .then(entry => res.status(201).json(entry.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.delete('/entries/:id', (req, res) => {
  Entry
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(201).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


app.put('/entries/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes'];
  updateableFields.forEach(field => { 
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Entry
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedEntry => res.status(201).json(updatedEntry.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

app.get('/newentry', (req, res) => {
	res.json('hello world');
});

let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};