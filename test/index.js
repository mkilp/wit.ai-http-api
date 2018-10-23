'use strict';

let should = require('chai').should();

let WitAi = require('../index');
let wit = new WitAi('SPAOMUX7VLJMCCV7OKURQBLQIRNMF4HW');

let getEntities = wit.entities.getEntities;
let postEntities = wit.entities.postEntities;

describe('#entities', () => {
  it('should return list of entities', function() {
    getEntities((err, data) => {
      should.exist(data);
      data.should.be.a('array');
    });
  });
  it('should create and return a new entity', function() {
    postEntities({
      id: 'Testentity',
    }, (err, data) => {
      should.not.exist(err);
      should.exist(data);
      data.should.have.property('name');
      data.should.have.property('lang');
      data.should.have.property('lookups');
      data.should.have.property('builtin');
      data.should.have.property('doc');
      data.should.have.property('id');
    });
  });
});
