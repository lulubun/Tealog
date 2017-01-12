const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

//const {DATABASE_URL, PORT} = require('./config');
const {Tasting}= require('./models');

const app = express();

mongoose.Promise = global.Promise;

app.use(express.static('public'));
app.get('/', (req, res) => {
	res.json('hello world');
});

app.get('/aficionado', (req, res) => {
  Tasting
    .find()
    .exec()
    .then(aficionado => {
      res.json(aficionado.map(taste => taste.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/aficionado/:id', (req, res) => {
  Tasting
    .findById(req.params.id)
    .exec()
    .then(taste => res.json(taste.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.post('/aficionado', (req, res) => {
  const requiredFields = ['id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes'];
  requiredFields.forEach(field => {
    if (!(field in req.body)) {
      res.status(400).json(
        {error: `Missing "${field}" in request body`});
    }});

  Tasting
    .create({
    	teaName: req.body.teaName,
    	date: req.body.date,
    	vendor: req.body.vendor,
    	teaType: {
    		teaColor: req.body.teaType.teaColor,
    		flavored: req.body.teaType.flavored
    	},
    	amountUsed: req.body.amountUsed,
    	waterUsed: req.body.waterUsed,
    	brewTemp: req.body.brewTemp,
    	steepingTime: req.body.steepingTime,
    	additions: {
    		cream: req.body.additions.cream,
    		sugar: req.body.additions.sugar,
    		honey: req.body.additions.honey,
    		lemon: req.body.additions.lemon,
    		other: req.body.additions.other
    	},
    	aroma: req.body.aroma,
    	taste: req.body.taste,
    	stars: req.body.stars,
    	notes: req.body.notes
    })
    .then(taste => res.status(201).json(taste.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });

});

app.delete('/aficionado/:id', (req, res) => {
  Tasting
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


app.put('/aficionado/:id', (req, res) => {
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

  Tasting
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});


app.delete('/:id', (req, res) => {
  Tasting
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      console.log(`Deleted tasting with id \`${req.params.ID}\``);
      res.status(201).end();
    });
});


app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

app.get('/newentry', (req, res) => {
	res.json('hello world');
});
app.listen(process.env.PORT || 8080);

module.exports = app;