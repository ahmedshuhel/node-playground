var assert = require('assert');
var getModuleId = require('./moduleId-from-path').getModuleId;
var path = require('path');

describe('getModuleId', function() {

  it('it can resolve id from from all selector rule', function() {
    var file = 'C:/Users/Shuhel/Workspace/skeleton-navigation/dist/welcome.js';
    var id = getModuleId(file);
    assert.equal(id, 'welcome');
  });

  it('it can resolve id from lib/*', function() {
    var file = 'C:/Users/Shuhel/Workspace/skeleton-navigation/src/welcome.js';
    var id = getModuleId(file);
    assert.equal(id, 'aurelia-spike/welcome');
  });

  it('it can resolve id from local github end point', function() {
    var file = "C:/Users/Shuhel/Workspace/skeleton-navigation/jspm_packages/github/components/jquery@2.1.3/jquery.js"

    var id = getModuleId(file);
    assert.equal(id, 'github:components/jquery@2.1.3/jquery');
  });

  it('throws when no matching rules found', function() {
    var file = 'C:/Users/Shuhel/Workspace/aurelia-spike/dist/welcome.js';
    assert.throws(function() {
        getModuleId(file);
      },
      /No matching rule defined for file:/);
  });
});
