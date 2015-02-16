var path = require('path');

var baseURL = 'C:/Users/Shuhel/Workspace/skeleton-navigation/dist/';
var System = {
  paths: {
    '*': "*.js",
    'aurelia-spike/*': "../src/*.js",
    'test/*'  : "../test/*.js",
    'github:*': "../jspm_packages/github/*.js",
    'npm:*': "../jspm_packages/npm/*.js"
  }
};

exports.getModuleId = function(file) {

  var paths = System.paths;

  var id = '';
  var matchLength = 0;

  for (rule in paths) {
    var resolvedPath = path.resolve(baseURL, paths[rule])
    resolvedPath = resolvedPath.replace(/\\/g, '/'); // replace  '\' with  '/'

    var pathDir = path.dirname(resolvedPath); // find the the directory of the path.
    var fileDir = path.dirname(file); // find the file's directory.
    var pathLength = pathDir.split('/').length;

    var regex = new RegExp('^' + pathDir, 'i');  

    if (regex.test(fileDir) && matchLength < pathLength) {
      var parts = rule.split('*');
      var moduleName = file.replace(regex, '');
      moduleName = moduleName.replace(/^\//, ''); //remove the last trailing '/' from the baseURL
      moduleName = moduleName.replace(new RegExp(path.extname(resolvedPath) + '$', 'g'), ''); // remove any extension the rule have from the moduleName.
      id = parts[0] + moduleName;
      matchLength = pathLength;
    }
  }

  if (id === '') {
    throw new Error('No matching path defined for file: ' + "'" + file + "'");
  }

  return id;
}
