var assert = require("assert");
var getModuleFromFile = require("./file-to-module").getModuleFromFile;

describe('getModuleFromFile', function(){
  var filePath, baseURL;

  beforeEach(function(){
     filePath = "C:/Users/Shuhel/Workspace/aurelia-app/dist/outdoor/index.js";
     baseURL = "C:/Users/Shuhel/Workspace/aurelia-app/";
  });


  it('when passing empty parmas it throws', function(){
      assert.throws(function(){ getModuleFromFile("", ""); }, /Wrong input/);
  });

  it("when base url is empty it throws", function(){
      assert.throws(function(){ getModuleFromFile(filePath, "")}, /Wrong input/);
  });

  it("when file path is empty it throws", function(){
      assert.throws(function(){ getModuleFromFile("", baseURL)}, /Wrong input/);
  });

  it("when file path is smaller then the baseURL throws", function(){
      var smallerFilePath = "C:/Users/Shuhel/Workspace/abc.js";
      assert.throws(
        function(){ getModuleFromFile(smallerFilePath, baseURL) }, /Base path doesn't match/);
  });

  it("when file path does not contains the entire baseURL it throws", function(){
      var baseURL2 = "C:/Users/Shuhel/Workspace/aurelia-appp/";
      assert.throws(
         function(){ getModuleFromFile(filePath, baseURL2)}, /Base path doesn't match/);
  });

  it("it returns the module name", function(){
      assert.equal(getModuleFromFile(filePath, baseURL), "dist/outdoor/index");
  });



});
