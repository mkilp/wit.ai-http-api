'use strict';

let chai = require('chai');
chai.use(require('chai-things'));
let should = chai.should();
let assert = chai.assert;
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({
    path: '../',
  });
}

let WitAi = require('../index');
let wit = new WitAi(process.env.WIT_TOKEN);

let getEntities = wit.entities.getEntities;
let postEntities = wit.entities.postEntities;
let getEntityById = wit.entities.getEntityById;
let putEntityById = wit.entities.putEntityById;
let postEntityValue = wit.entities.postEntityValues;
let postEntityValueExpression = wit.entities.postEntityValueExpression;
let deleteEntityValue = wit.entities.deleteEntityValue;
let deleteEntityValueExpression = wit.entities.deleteEntityValueExpression;
let deleteEntityById = wit.entities.deleteEntityById;

let postApp = wit.apps.postApp;
let getApps = wit.apps.getApps;
let getAppById = wit.apps.getAppById;
let deleteAppById = wit.apps.deleteAppById;

describe('#apps', () => {
  it('should create an app in wit.ai', function(done) {
    this.timeout(5000);
    try {
      postApp({
        name: 'TestApp',
        lang: 'en',
        private: 'true',
        desc: 'Test',
      }, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('app_id');
        data.app_id.should.be.a('string');
        data.should.have.property('access_token');
        data.access_token.should.be.a('string');
        // Set the environment to the new app token.
        process.env.WIT_TOKEN = data.access_token;
        process.env.WIT_ID = data.app_id;
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
    }
  });
  it('should get all apps include the one just created', function(done) {
    this.timeout(5000);
    try {
      getApps((err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.be.a('array');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
    }
  });
  it('should get the created app by id', function(done) {
    this.timeout(5000);
    try {
      getAppById(process.env.WIT_ID, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.equal('TestApp');

        data.should.have.property('lang');
        data.lang.should.be.a('string');
        data.lang.should.equal('en');

        data.should.have.property('description');
        data.description.should.be.a('string');

        data.should.have.property('private');
        data.should.have.property('created_at');
        data.should.have.property('last_training_duration_secs');
        data.should.have.property('will_train_at');
        data.should.have.property('last_trained_at');
        data.should.have.property('training_status');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
    }
  });
});

describe('#entities', () => {
  it('should return list of entities', function(done) {
    this.timeout(5000);
    try {
      getEntities((err, data) => {
        should.exist(data);
        data.should.be.a('array');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
    }
  });
  it('should create and return a new entity', function(done) {
    this.timeout(5000);
    try {
      postEntities({
        id: 'testentity',
      }, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.equal('testentity');
        data.should.have.property('lang');
        data.should.have.property('lookups');
        data.should.have.property('builtin');
        data.should.have.property('doc');
        data.should.have.property('id');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should return the newly created entity', function(done) {
    this.timeout(5000);
    try {
      getEntityById('testentity', (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.equal('testentity');
        data.should.have.property('lang');
        data.lang.should.be.a('string');
        data.should.have.property('lookups');
        data.lookups.should.be.a('array');
        data.should.have.property('builtin');
        data.should.have.property('doc');
        data.doc.should.be.a('string');
        data.should.have.property('id');
        data.id.should.be.a('string');
        data.should.have.property('values');
        data.id.should.be.a('string');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should update the newly created entity', function(done) {
    this.timeout(5000);
    try {
      let params = {
        doc: 'Test of put function',
        lookups: ['keywords'],
        values: [{
          value: 'Test',
          expressions: ['testexpression'],
          metadata: 'testing',
        }],
      };
      putEntityById('testentity', params, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.equal('testentity');
        data.should.have.property('lang');
        data.lang.should.be.a('string');
        data.should.have.property('lookups');
        data.lookups.should.be.a('array');
        data.should.have.property('builtin');
        data.should.have.property('doc');
        data.doc.should.be.a('string');
        data.doc.should.equal('Test of put function');
        data.should.have.property('id');
        data.id.should.be.a('string');
        getEntityById('testentity', (err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.have.property('values');
          data.values.should.be.a('array');
          data.values.should.include.something.that.deep.equals({
            value: 'Test',
            expressions: ['Test', 'testexpression'],
            metadata: 'testing',
          });
          done();
        });
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should add a value to the newly created entity', function(done) {
    this.timeout(5000);
    try {
      let params = {
        value: 'London',
        expressions: ['London'],
        metadata: 'CITY_1234',
      };
      postEntityValue('testentity', params, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.equal('testentity');
        data.should.have.property('lang');
        data.lang.should.be.a('string');
        data.should.have.property('lookups');
        data.lookups.should.be.a('array');
        data.should.have.property('builtin');
        data.should.have.property('doc');
        data.doc.should.be.a('string');
        data.doc.should.equal('Test of put function');
        data.should.have.property('id');
        data.id.should.be.a('string');
        getEntityById('testentity', (err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.have.property('values');
          data.values.should.be.a('array');
          data.values.should.include.something.that.deep.equals({
            value: 'London',
            expressions: ['London'],
            metadata: 'CITY_1234',
          });
          done();
        });
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should add an expression to the created value', function(done) {
    this.timeout(5000);
    try {
      let params = {
        expression: 'Tea City',
      };
      postEntityValueExpression('testentity', 'London', params, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('name');
        data.name.should.be.a('string');
        data.name.should.equal('testentity');
        getEntityById('testentity', (err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.have.property('values');
          data.values.should.be.a('array');
          data.values.should.include.something.that.deep.equals({
            value: 'London',
            expressions: ['London', 'Tea City'],
            metadata: 'CITY_1234',
          });
          done();
        });
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should delete an expression from the created value', function(done) {
    this.timeout(5000);
    try {
      deleteEntityValueExpression('testentity', 'London', 'Tea City',
        (err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.have.property('deleted');
          data.deleted.should.be.a('string');
          data.deleted.should.equal('Tea City');
          getEntityById('testentity', (err, data) => {
            should.not.exist(err);
            should.exist(data);
            data.should.have.property('values');
            data.values.should.be.a('array');
            data.values.should.not.include.something.that.deep.equals({
              value: 'London',
              expressions: ['London', 'Tea City'],
              metadata: 'CITY_1234',
            });
            done();
          });
        });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should delete a value from the newly created entity', function(done) {
    this.timeout(5000);
    try {
      deleteEntityValue('testentity', 'London', (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('deleted');
        data.deleted.should.be.a('string');
        data.deleted.should.equal('London');
        getEntityById('testentity', (err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.have.property('values');
          data.values.should.be.a('array');
          data.values.should.not.include.something.that.deep.equals({
            value: 'London',
            expressions: ['London'],
            metadata: 'CITY_1234',
          });
          done();
        });
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
  it('should delete an entity by id', function(done) {
    this.timeout(5000);
    try {
      deleteEntityById('testentity', (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('deleted');
        data.deleted.should.be.a('string');
        getEntities((err, data) => {
          should.not.exist(err);
          should.exist(data);
          data.should.be.a('array');
          done();
        });
      });
    } catch (e) {
      assert.fail(0, 1, e);
      done();
    }
  });
});

describe('#pastTest', () => {
  it('should delete the created app', function(done) {
    this.timeout(10000);
    try {
      deleteAppById(process.env.WIT_ID, (err, data) => {
        should.not.exist(err);
        should.exist(data);
        data.should.have.property('success');
        data.success.should.be.a('boolean');
        data.success.should.equal('true');
        done();
      });
    } catch (e) {
      assert.fail(0, 1, e);
    }
  });
});
