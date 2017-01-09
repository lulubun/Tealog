var express = require('express');
var app = express();

app.use(express.static('public'));
app.get('/', (req, res) => {
	res.json('hello world');
});
app.listen(process.env.PORT || 8080);

module.exports = app;