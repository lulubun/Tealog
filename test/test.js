const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const should = chai.should();

const {Entry} = require('../models');
const {runServer, app, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function addStarterData() {
  const seedData = [{
    date: 'Jan 1, 2020',
    teaName: 'Tester Tea',
    vendor: 'Tea Company',
    teaType: {
      teaColor: 'Black',
      flavored: true
    },
    amountUsed: '1 tsp',
    waterUsed: '1 cup',
    brewTemp: '212',
    steepingTime: '4 min',
    additions: {
      cream: true,
      sugar: true,
      honey: false,
      lemon: false,
      other: ''
    },
    aroma: 'fruity',
    taste: 'sweet',
    stars: 5,
    notes: ''
  },
  {
    date: 'Jan 2, 2020',
    teaName: 'Tester Tea Two',
    vendor: 'Tea Company',
    teaType: {
      teaColor: 'Black',
      flavored: true
    },
    amountUsed: '1 tsp',
    waterUsed: '1 cup',
    brewTemp: '212',
    steepingTime: '4 min',
    additions: {
      cream: true,
      sugar: true,
      honey: false,
      lemon: false,
      other: ''
    },
    aroma: 'fruity',
    taste: 'sweet',
    stars: 5,
    notes: ''
  }];
  return Entry.insertMany(seedData);
}

describe('get root', () => {
	it('should get a 200 status and html', () => {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
		});
	});	
});


function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
};

describe('Entry API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return addStarterData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {
    it('should return all existing entries', function() {
      let res;
      return chai.request(app)
      .get('/entries')
      .then(function(_res) {
        res = _res;
        res.should.have.status(200);
        return Entry.count();
      })
      .then(function(count) {
        res.body.should.have.length.of(count);
      });
    });

    it('should return Entry with right fields', function() {
      let resEntries;
      return chai.request(app)
      .get('/entries')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.entries.forEach(function(entry) {
          entry.should.be.an('object');
          entry.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
        });
        resEntries = res.body.entries[0];
        return Entry.findById(resEntries.id);
      })
      .then(function(entry) {
        resEntries.id.should.equal(entry.id);
        resEntries.teaName.should.equal(entry.teaName);
        resEntries.date.should.equal(entry.date);
        resEntries.vendor.should.equal(entry.vendor);
        resEntries.teaType.should.contain(entry.teaType.teaColor);
        resEntries.waterUsed.should.equal(entry.waterUsed);  
        resEntries.brewTemp.should.equal(entry.brewTemp);        
        resEntries.steepingTime.should.equal(entry.steepingTime);
        resEntries.additions.should.contain(entry.additions.cream);
        resEntries.aroma.should.equal(entry.aroma);
        resEntries.taste.should.equal(entry.taste);
        resEntries.stars.should.equal(entry.stars);
        resEntries.notes.should.equal(entry.notes);
      });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new entry', function() {
      const newEntry = {
        date: 'Jan 1, 2020',
        teaName: 'Tester Tea',
        vendor: 'Tea Company',
        teaType: {
          teaColor: 'Black',
          flavored: true
        },
        amountUsed: '1 tsp',
        waterUsed: '1 cup',
        brewTemp: '212',
        steepingTime: '4 min',
        additions: {
          cream: true,
          sugar: true,
          honey: false,
          lemon: false,
          other: ''
        },
        aroma: 'fruity',
        taste: 'sweet',
        stars: 5,
        notes: ''
      };
      return chai.request(app)
      .post('/entries')
      .send(newEntry)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'teaName', 'date', 'vendor', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
        res.body.id.should.not.be.null;
        res.body.teaName.should.equal(newEntry.teaName);
        res.body.date.should.equal(newEntry.date);
        res.body.vendor.should.equal(newEntry.vendor);
        res.body.amountUsed.should.equal(newEntry.amountUsed);
        res.body.waterUsed.should.equal(newEntry.waterUsed);  
        res.body.brewTemp.should.equal(newEntry.brewTemp);        
        res.body.steepingTime.should.equal(newEntry.steepingTime);
        res.body.aroma.should.equal(newEntry.aroma);
        res.body.taste.should.equal(newEntry.taste);
        res.body.stars.should.equal(newEntry.stars);
        res.body.notes.should.equal(newEntry.notes);
        return Entry.findById(res.body.id);
      })
      .then(function(entry) {
        entry.teaName.should.equal(newEntry.teaName);
        entry.date.should.equal(newEntry.date);
        entry.vendor.should.equal(newEntry.vendor);
        entry.teaType.flavor.should.equal(newEntry.teaType.flavor);
        entry.teaType.teaColor.should.equal(newEntry.teaType.teaColor);
        entry.amountUsed.should.equal(newEntry.amountUsed);
        entry.waterUsed.should.equal(newEntry.waterUsed);
        entry.brewTemp.should.equal(newEntry.brewTemp);
        entry.steepingTime.should.equal(newEntry.steepingTime);
      });
    });
  });

  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        teaName: 'fofofofofofofof',
        vendor: 'a dude'
      };
      return Entry
      .findOne()
      .exec()
      .then(function(entries) {
        updateData.id = entries.id;
        return chai.request(app)
        .put(`/entries/${entries.id}`)
        .send(updateData);
      })
      .then(function(res) {
        res.should.have.status(201);
        return Entry.findById(updateData.id).exec();
      })
      .then(function(entries) {
        entries.teaName.should.equal(updateData.teaName);
        entries.vendor.should.equal(updateData.vendor)
      });
    });
  });

  describe('DELETE endpoint', function() {
    it('delete an entry by id', function() {
      let entries;
      return Entry
      .findOne()
      .exec()
      .then(function(_entries) {
        entries = _entries;
        return chai.request(app).delete(`/entries/${entries.id}`);
      })
      .then(function(res) {
        res.should.have.status(201);
        return Entry.findById(entries.id).exec();
      })
      .then(function(_entries) {
        should.not.exist(_entries);
      });
    });
  });
});

