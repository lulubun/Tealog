const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const should = chai.should();

//const {Log} = require('../models');
/*const {runServer, app, closeServer} = require('../server');
//const {TEST_DATABASE_URL} = require('../config');
*/
chai.use(chaiHttp);

describe('get root', () => {
	it('it should show hellow world', (done) => {
		chai.request(server)
			.get('/')
	})	
})
/*
function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('TeaLog API resource', function() {

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

    it('should return all existing logs', function() {
      // strategy:
      //    1. get back all restaurants returned by by GET request to `/restaurants`
      //    2. prove res has right status, data type
      //    3. prove the number of restaurants we got back is equal to number
      //       in db.
      //
      // need to have access to mutate and access `res` across
      // `.then()` calls below, so declare it here so can modify in place
      let res;
      return chai.request(app)
        .get('/userlog')
        .then(function(_res) {
          // so subsequent .then blocks can access resp obj.
          res = _res;
          res.should.have.status(200);
          // otherwise our db seeding didn't work
          res.body.should.have.length.of.at.least(1);
          return TeaLog.count();
        })
        .then(function(count) {
          res.body.should.have.length.of(count);
        });
    });


    it('should return userlog with right fields', function() {
      // Strategy: Get back all restaurants, and ensure they have expected keys

      let resBlogPost;
      return chai.request(app)
        .get('/userlog')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(userlog) {
            userlog.should.be.an('object');
            userlog.should.include.keys(
              'id', 'title', 'content', 'author');
          });
          resBlogPost = res.body[0];
          return TeaLog.findById(resBlogPost.id);
        })
        .then(function(userlog) {
          //removed post.from () may need to undo
          resBlogPost.id.should.equal(userlog.id);
          resBlogPost.title.should.equal(userlog.title);
          resBlogPost.content.should.equal(userlog.content);
          resBlogPost.author.should.equal(userlog.author.firstName + " " + userlog.author.lastName);
        });
    });
  });

  describe('POST endpoint', function() {
    // strategy: make a POST request with data,
    // then prove that the userlog we get back has
    // right keys, and that `id` is there (which means
    // the data was inserted into db)
    it('should add a new userlog', function() {

      const newBlogPost = generateBlogPostData();

      return chai.request(app)
        .post('/userlog')
        .send(newBlogPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'title', 'content', 'author');
          // cause Mongo should have created id on insertion
          res.body.id.should.not.be.null;
          res.body.title.should.equal(newBlogPost.title);
          res.body.content.should.equal(newBlogPost.content);
          res.body.author.should.equal(newBlogPost.author.firstName + " " + newBlogPost.author.lastName);          
          return TeaLog.findById(res.body.id);
        })
        .then(function(userlog) {
          userlog.title.should.equal(newBlogPost.title);
          userlog.content.should.equal(newBlogPost.content);
          userlog.author.firstName.should.equal(newBlogPost.author.firstName);
          userlog.author.lastName.should.equal(newBlogPost.author.lastName);

        });
    });
  });

  describe('PUT endpoint', function() {

    // strategy:
    //  1. Get an existing userlog from db
    //  2. Make a PUT request to update that userlog
    //  3. Prove userlog returned by request contains data we sent
    //  4. Prove userlog in db is correctly updated
    it('should update fields you send over', function() {
      const updateData = {
        title: 'fofofofofofofof',
        content: 'futuristic fusion'
      };

      return TeaLog
        .findOne()
        .exec()
        .then(function(userlog) {
          updateData.id = userlog.id;

          // make request then inspect it to make sure it reflects
          // data we sent
          return chai.request(app)
            .put(`/userlog/${userlog.id}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(201);

          return TeaLog.findById(updateData.id).exec();
        })
        .then(function(userlog) {
          userlog.title.should.equal(updateData.title);
          userlog.content.should.equal(updateData.content);
        });
      });
  });

  describe('DELETE endpoint', function() {
    // strategy:
    //  1. get a userlog
    //  2. make a DELETE request for that userlog's id
    //  3. assert that response has right status code
    //  4. prove that userlog with the id doesn't exist in db anymore
    it('delete a userlog by id', function() {

      let userlog;

      return TeaLog
        .findOne()
        .exec()
        .then(function(_blog) {
          userlog = _blog;
          return chai.request(app).delete(`/userlog/${userlog.id}`);
        })
        .then(function(res) {
          res.should.have.status(201);
          return TeaLog.findById(userlog.id).exec();
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

