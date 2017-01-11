const express = require('express');
const app = express();
const {Logs}= require('./models');

app.use(express.static('public'));
app.get('/', (req, res) => {
	res.json('hello world');
});

app.get('/aficionado', (req, res) => {
  Logs
    .find()
    .exec()
    .then(aficionado => {
      res.json(log.map( => log.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/aficionado/:id', (req, res) => {
  Logs
    .findById(req.params.id)
    .exec()
    .then(post => res.json(post.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.get('/newlog', (req, res) => {
	res.json('hello world');
});
app.listen(process.env.PORT || 8080);

module.exports = app;