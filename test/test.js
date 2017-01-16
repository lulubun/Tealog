const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

const {Tasting} = require('../models');
const {runServer, app, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


describe('get root', () => {
	it('it get a 200 status and html', () => {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
		});
	});	
});

describe('get aficionado page', () => {
  it('it get a 200 status and html', () => {
    return chai.request(app)
    .get('/aficionado')
    .then(function(res) {
      res.should.have.status(200);
    });
  }); 

  it('should return all available entries with the right fields', () => {
    let resTasting;
    return chai.request(app)
      .get('/aficionado')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.forEach(function(aficionado) {
          aficionado.should.be.an('object');
          aficionado.should.include.keys(
                      'id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes')
        });
          aficionado.teaType.should.include.keys('teaColor', 'flavored')
          aficionado.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other')
        resTasting = res.body[0];
        return Tasting.findById(resLogs.id);
      })
      .then(function(aficionado) {
        resTasting.id.should






      })  
  })
});

describe('get new entry page', () => {
  it('it get a 200 status and html', () => {
    return chai.request(app)
    .get('/newentry')
    .then(function(res) {
      res.should.have.status(200);
    });
  }); 
});

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Tasting API resource', function() {

  // we need each of these hook functions to return a promise
  // otherwise we'd need to call a `done` callback. `runServer`,
  // `seedRestaurantData` and `tearDownDb` each return a promise,
  // so we return the value returned by these function calls.
  before(function() {
    return runServer(DATABASE_URL);
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  })
  describe('GET endpoint', function() {

    it('should return all existing entries', function() {
      let res;
      return chai.request(app)
        .get('/aficionado')
        .then(function(_res) {
          res = _res;
          res.should.have.status(200);
          return Tasting.count();
        })
        .then(function(count) {
          res.body.should.have.length.of(count);
        });
    });


    it('should return Tasting with right fields', function() {
      // Strategy: Get back all restaurants, and ensure they have expected keys

      let resTasting;
      return chai.request(app)
        .get('/aficionado')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');

          res.body.forEach(function(aficionado) {
            aficionado.should.be.an('object');
            aficionado.should.include.keys(
              'id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
            aficionado.teaType.should.include.keys('teaColor', 'flavored')
            aficionado.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other')
          });
          resTasting = res.body[0];
          return Tasting.findById(resTasting.id);
        })
        .then(function(aficionado) {
          //removed post.from () may need to undo
          //resTasting.id.should.equal(aficionado.id);
          //resTasting.teaName.should.equal(aficionado.teaName);
          //resTasting.date.should.equal(aficionado.date);
          //resTasting.author.should.equal(aficionado.teaType.teaColor + " " + aficionado.teaType.flavor);
        });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new entry', function() {

      const newTasting = generateTastingData();

      return chai.request(app)
        .post('/aficionado')
        .send(newTasting)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
              'id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
            res.body.teaType.should.include.keys('teaColor', 'flavored')
            res.body.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other')
          });
          res.body.id.should.not.be.null;
          res.body.teaName.should.equal(newTasting.teaName);
          res.body.date.should.equal(newTasting.date);
          res.body.vendor.should.equal(newTasting.vendor);
          res.body.teaType.teaColor.should.equal(newTasting.teaType.teaColor);
          res.body.teaType.flavor.should.equal(newTasting.teaType.flavor);
          res.body.waterUsed.should.equal(newTasting.waterUsed);  
          res.body.brewTemp.should.equal(newTasting.brewTemp);        
          res.body.steepingTime.should.equal(newTasting.steepingTime);
          res.body.additions.cream.should.equal(newTasting.additions.cream);
          res.body.additions.sugar.should.equal(newTasting.additions.sugar);
          res.body.additions.honey.should.equal(newTasting.additions.honey);
          res.body.additions.lemon.should.equal(newTasting.additions.lemon);
          res.body.additions.other.should.equal(newTasting.additions.other);
          res.body.aroma.should.equal(newTasting.aroma);
          res.body.taste.should.equal(newTasting.taste);
          res.body.stars.should.equal(newTasting.stars);
          res.body.notes.should.equal(newTasting.notes);
          return Tasting.findById(res.body.id);
        })

    //stopped here on Thursday Night

        .then(function(aficionado) {
          aficionado.teaName.should.equal(newTasting.teaName);
          aficionado.date.should.equal(newTasting.date);
          aficionado.vendor.should.equal(newTasting.vendor);
          aficionado.teaType.teaColor.should.equal(newTasting.teaType.teaColor);
          aficionado.teaType.flavor.should.equal(newTasting.teaType.flavor);

        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing aficionado from db
    //  2. Make a PUT request to update that aficionado
    //  3. Prove aficionado returned by request contains data we sent
    //  4. Prove aficionado in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        teaName: 'fofofofofofofof',
        date: 'futuristic fusion'
      };

      return Tasting
        .findOne()
        .exec()
        .then(function(aficionado) {
          updateData.id = aficionado.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/aficionado/${aficionado.id}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(201);

          return Tasting.findById(updateData.id).exec();
        })
        .then(function(aficionado) {
          aficionado.teaName.should.equal(updateData.teaName);
          aficionado.date.should.equal(updateData.date);
        });
      });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a aficionado
    //  2. make a DELETE request for that aficionado's id
    //  3. assert that response has right status code
    //  4. prove that aficionado with the id doesn't exist in db anymore
    it('delete a aficionado by id', function() {

      let aficionado;

      return Tasting
        .findOne()
        .exec()
        .then(function(_blog) {
          aficionado = _blog;
          return chai.request(app).delete(`/aficionado/${aficionado.id}`);
        })
        .then(function(res) {
          res.should.have.status(201);
          return Tasting.findById(aficionado.id).exec();
        })
        .then(function(_blog) {
          // when a variable's value is null, chaining `should`
          // doesn't work. so `_blog.should.be.null` would raise
          // an error. `should.be.null(_blog)` is how we can
          // make assertions about a null value.
          should.not.exist(_blog);
        });
    });
  });
});
*/

