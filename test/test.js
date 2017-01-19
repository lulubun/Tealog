const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

const {Entry} = require('../models');
const {runServer, app, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


describe('get root', () => {
	it('should get a 200 status and html', () => {
		return chai.request(app)
		.get('/')
		.then(function(res) {
			res.should.have.status(200);
		});
	});	
});

describe('get entries page', () => {
  it('should return a 200 status and html', () => {
    let res;
    return chai.request(app)
    .get('/entries')
    .then(function(_res) {
      res = _res;
      res.should.have.status(200);
      return Entry.count();
    })
    .then(function(count) {
      res.body.entries.should.have.length.of(count);
    });
  }); 

  it('should return all available entries with the right fields', () => {
    let resEntries;
    return chai.request(app)
    .get('/entries')
    .then(function(res) {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('array');
      res.body.forEach(function(entries) {
        entries.should.be.an('object');
        entries.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
      });
      entries.teaType.should.include.keys('teaColor', 'flavored');
      entries.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other');
      resEntries = res.body[0];
      return Entry.findById(resEntries.id);
    })
    .then(function(entries) {
      resEntries.id.should.equal(entry.id);

    })  
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
        res.body.entries.should.be.a('array');
        res.body.entries.forEach(function(entries) {
          entry.should.be.an('object');
          entry.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
          entry.teaType.should.include.keys('teaColor', 'flavored');
          entry.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other');
        });
        resEntries = res.body.entries[0];
        return Entry.findById(resEntries.id);
      })
      .then(function(entry) {
        resEntries.id.should.equal(entry.id);
        resEntries.teaName.should.equal(entry.teaName);
        resEntries.date.should.equal(entry.date);
        resEntries.vendor.should.equal(entry.vendor);
        resEntries.teaType.teaColor.should.equal(entry.teaType.teaColor);
        resEntries.teaType.flavor.should.equal(entry.teaType.flavor);
        resEntries.waterUsed.should.equal(entry.waterUsed);  
        resEntries.brewTemp.should.equal(entry.brewTemp);        
        resEntries.steepingTime.should.equal(entry.steepingTime);
        resEntries.additions.cream.should.equal(entry.additions.cream);
        resEntries.additions.sugar.should.equal(entry.additions.sugar);
        resEntries.additions.honey.should.equal(entry.additions.honey);
        resEntries.additions.lemon.should.equal(entry.additions.lemon);
        resEntries.additions.other.should.equal(entry.additions.other);
        resEntries.aroma.should.equal(entry.aroma);
        resEntries.taste.should.equal(entry.taste);
        resEntries.stars.should.equal(entry.stars);
        resEntries.notes.should.equal(entry.notes);
      });
    });
  });

  describe('POST endpoint', function() {
    it('should add a new entry', function() {
      const newEntry = generateEntryData();
      return chai.request(app)
      .post('/entries')
      .send(newEntry)
      .then(function(res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('id', 'teaName', 'date', 'vendor', 'teaType', 'amountUsed', 'waterUsed', 'brewTemp', 'steepingTime', 'additions', 'aroma', 'taste', 'stars', 'notes');
        res.body.teaType.should.include.keys('teaColor', 'flavored');
        res.body.additions.should.include.keys('cream', 'sugar', 'honey', 'lemon', 'other');
        res.body.id.should.not.be.null;
        res.body.teaName.should.equal(newEntry.teaName);
        res.body.date.should.equal(newEntry.date);
        res.body.vendor.should.equal(newEntry.vendor);
        res.body.teaType.teaColor.should.equal(newEntry.teaType.teaColor);
        res.body.teaType.flavor.should.equal(newEntry.teaType.flavor);
        res.body.waterUsed.should.equal(newEntry.waterUsed);  
        res.body.brewTemp.should.equal(newEntry.brewTemp);        
        res.body.steepingTime.should.equal(newEntry.steepingTime);
        res.body.additions.cream.should.equal(newEntry.additions.cream);
        res.body.additions.sugar.should.equal(newEntry.additions.sugar);
        res.body.additions.honey.should.equal(newEntry.additions.honey);
        res.body.additions.lemon.should.equal(newEntry.additions.lemon);
        res.body.additions.other.should.equal(newEntry.additions.other);
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
        entry.teaType.teaColor.should.equal(newEntry.teaType.teaColor);
        entry.teaType.flavor.should.equal(newEntry.teaType.flavor);
      });
    });
  });

  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        teaName: 'fofofofofofofof',
        date: 'Jan 30, 2010'
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
        entries.date.should.equal(updateData.date);
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

