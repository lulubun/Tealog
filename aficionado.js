function displayEntries(res) {
  $(".entries-list").text(entries);
};

const entries = {
  	create: function(res) {
    	const entry = {
    		date: res.date,
    		teaName: res.teaName,
      		vendor: res.vendor,
      		teaType: {
      			teaColor: res.teaColor,
      			flavored: res.flavored
  			},
  			additions: {
      			cream: res.cream,
      			sugar: res.sugar,
      			honey: res.honey,
      			lemon: res.lemon,
      			other: res.lemon
      		},
      		aroma: res.aroma,
      		taste: res.taste,
      		stars: res.stars,
      		notes: res.notes
      	};		
    };
 	this.entry[entry.id] = entry;
    return entry;
};

// GET requests to the root of the server
app.get('/aficionado', (req, res) => res.send(displayEntries(res)));
