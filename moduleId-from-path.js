var path = require('path');

var baseURL = 'C:/Users/Shuhel/Workspace/skeleton-navigation/dist/';
var System = {
  paths: {
    '*': "*.js",
    'aurelia-spike/*': "../src/*.js",
    'github:*': "../jspm_packages/github/*.js",
    'npm:*': "../jspm_packages/npm/*.js"
  }
};

exports.getModuleId = function(file) {

  var sortedPaths = sortPathsByValue(System.paths); // sort the rules in descending order so that the longest specific rule goes at the top.

  var id = '';
  for (p in sortedPaths) {
     
    var rule = sortedPaths[p];
    var resolved = path.resolve(baseURL, rule); // resolve the full path from the rule
    resolved = resolved.replace(/\\/g, '/'); // replace  '\' with  '/'

    var ruleDir =  path.dirname(resolved); // find the resolved directory
    var fileDir = path.dirname(file);      // find the file's directory.

    var regex = new RegExp('^' + ruleDir, 'i'); // test if rule's directory path have a match with file's directory.

    if(regex.test(fileDir)){
     var parts = p.split('*');
     var moduleName =  file.replace(regex, '');
     moduleName = moduleName.replace(/^\//, ''); //remove the last trailing '/' from the baseURL
     moduleName =  moduleName.replace(new RegExp(path.extname(rule) + '$', 'g'), ''); // remove any extension the rule have from the moduleName.
     id = parts[0] + moduleName;
    }
  }

  if(id === ''){
    throw new Error('No matching rule defined for file: ' + "'" + file + "'");
  }

  return id;
}

function sortPathsByValue(obj) {
  // convert object into array
  var sortable = [];
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]);
    }
  }
  // sort items by path value in descending order
  sortable.sort(function(a, b) {
    var x = a[1].toLowerCase();
    var y = b[1].toLowerCase();

    if (x.length > y.length) return -1;
    if (x.length < y.length) return 1;
    return 0;
  });

  var sorted = {};
  sortable.forEach(function(arr) {
    sorted[arr[0]] = arr[1];
  });

  return sorted;
};
