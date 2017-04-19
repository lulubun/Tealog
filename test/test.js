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
    date: '2020-01-01T05:00:00.000Z',
    teaName: 'Tester Tea',
    vendor: 'Tea Company',
    teaColorTeaType: 'Black',
    flavoredTeaType: true,
    creamAdditions: true,
    sugarAdditions: true,
    honeyAdditions: false,
    lemonAdditions: false,
    otherAdditions: '',
    aroma: 'fruity',
    taste: 'sweet',
    stars: 5,
    notes: ''
  },
  {
    date: '2020-02-01T05:00:00.000Z',
    teaName: 'Tester Tea Two',
    vendor: 'Another Company',
    teaColorTeaType: 'Green',
    flavoredTeaType: false,
    creamAdditions: false,
    sugarAdditions: true,
    honeyAdditions: false,
    lemonAdditions: false,
    otherAdditions: '',
    aroma: 'earthy',
    taste: 'bitter',
    stars: 3,
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

describe('Entries API resource', function() {
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
        res.body.forEach(function(entry) {
          entry.should.be.an('object');
          entry.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaColorTeaType', 'flavoredTeaType', 'creamAdditions', 'sugarAdditions', 'honeyAdditions', 'lemonAdditions', 'otherAdditions', 'aroma', 'taste', 'stars', 'notes');
        });
        resEntries = res.body[0];
        return Entry.findById(resEntries.id);
      })
      .then(function(entry) {
        resEntries.id.should.equal(entry.id);
        resEntries.teaName.should.equal(entry.teaName);
        //resEntries.date.should.equal(entry.date);
        resEntries.vendor.should.equal(entry.vendor);
        resEntries.teaColorTeaType.should.equal(entry.teaColorTeaType);
        resEntries.flavoredTeaType.should.equal(entry.flavoredTeaType);  
        resEntries.creamAdditions.should.equal(entry.creamAdditions);        
        resEntries.sugarAdditions.should.equal(entry.sugarAdditions);
        resEntries.honeyAdditions.should.equal(entry.honeyAdditions);
        resEntries.lemonAdditions.should.equal(entry.lemonAdditions);
        resEntries.otherAdditions.should.equal(entry.otherAdditions);
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
        date: '2020-01-01T05:00:00.000Z',
        teaName: 'Tester Tea',
        vendor: 'Tea Company',
        teaColorTeaType: 'Black',
        flavoredTeaType: false,
        creamAdditions: true,
        sugarAdditions: true,
        honeyAdditions: false,
        lemonAdditions: false,
        otherAdditions: '',
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
        res.body.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaColorTeaType', 'flavoredTeaType', 'creamAdditions', 'sugarAdditions', 'honeyAdditions', 'lemonAdditions', 'otherAdditions', 'aroma', 'taste', 'stars', 'notes');
        res.body.id.should.not.be.null;
        res.body.teaName.should.equal(newEntry.teaName);
        res.body.date.should.equal(newEntry.date);
        res.body.vendor.should.equal(newEntry.vendor);
        res.body.teaColorTeaType.should.equal(newEntry.teaColorTeaType);
        res.body.flavoredTeaType.should.equal(newEntry.flavoredTeaType);  
        res.body.creamAdditions.should.equal(newEntry.creamAdditions);        
        res.body.sugarAdditions.should.equal(newEntry.sugarAdditions);
        res.body.honeyAdditions.should.equal(newEntry.honeyAdditions);
        res.body.lemonAdditions.should.equal(newEntry.lemonAdditions);
        res.body.otherAdditions.should.equal(newEntry.otherAdditions);
        res.body.aroma.should.equal(newEntry.aroma);
        res.body.taste.should.equal(newEntry.taste);
        res.body.stars.should.equal(newEntry.stars);
        res.body.notes.should.equal(newEntry.notes);
        return Entry.findById(res.body.id);
      })
      .then(function(entry) {
        entry.teaName.should.equal(newEntry.teaName);
        //entry.date.should.equal(newEntry.date);
        entry.vendor.should.equal(newEntry.vendor);
        entry.flavoredTeaType.should.equal(newEntry.flavoredTeaType);
        entry.teaColorTeaType.should.equal(newEntry.teaColorTeaType);
        entry.creamAdditions.should.equal(newEntry.creamAdditions);
        entry.sugarAdditions.should.equal(newEntry.sugarAdditions);
        entry.honeyAdditions.should.equal(newEntry.honeyAdditions);
        entry.lemonAdditions.should.equal(newEntry.lemonAdditions);
        entry.otherAdditions.should.equal(newEntry.otherAdditions);
        entry.aroma.should.equal(newEntry.aroma);
        entry.taste.should.equal(newEntry.taste);
        entry.stars.should.equal(newEntry.stars);
        entry.notes.should.equal(newEntry.notes);
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

