var assert = require('assert');
var extractOperations = require('./extract-operations').extractOperations;

describe('extract operations', function() {
  it('return empty array when args is none', function(cb) {
    extractOperations('')
      .then(function(operations) {
        assert.equal(operations.length, 0);
        cb();
      }).catch(function(error) {
        cb(error);
      });

  });

  it('given a single module name, a single op is returned', function(cb) {
    extractOperations('aurelia-bootstrapper')
      .then(function(operations) {
        assert.equal(operations[0].moduleName, 'aurelia-bootstrapper');
        assert.equal(operations[0].operator, '+');
        cb();
      }).catch(function(error) {
        cb(error);
      });
  });

  it('given bundle expression, returns operations correctly', function(cb) {
    extractOperations('aurelia-bootstrapper + dist/**/*')
      .then(function(operations) {
        assert.equal(operations.length, 5);
        cb();
      }).catch(function(error) {
        cb(error);
      });
  });

  it('given bundle expression with multiple glob pattern, returns operations correctly', function(cb) {
    extractOperations('aurelia-bootstrapper + dist/**/* - src/*')
      .then(function(operations) {
        console.log(operations);
        assert.equal(operations.length, 8);
        cb();
      }).catch(function(error) {
        cb(error);
      });
  });
});
