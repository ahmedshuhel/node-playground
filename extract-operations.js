var Promise = require('rsvp').Promise;

exports.extractOperations = function(input) {
  var args = input.split(' ');
  var firstModule = args[0];
  var i;
  var operations = [];

  var seq = expandGlob(firstModule)
    .then(function(moduleNames) {
      moduleNames.forEach(function(mn) {
        operations.push({
          moduleName: mn,
          operator: '+'
        });
      });
    });

  for (i = 1; i < args.length - 1; i += 2) {
    seq = (function(name, operator) {
      return seq.then(function() {
        return expandGlob(name)
          .then(function(moduleNames) {
            moduleNames.forEach(function(mn) {
              operations.push({
                moduleName: mn,
                operator: operator
              });
            });
          });
      });
    })(args[i + 1], args[i]);
  }

  seq = seq.then(function() {
    return operations;
  });

  return seq;
}

function expandGlob(pattern) {
  var moduleNames = [];

  if (pattern === 'aurelia-bootstrapper') {
    moduleNames.push(pattern);
  } else if (pattern === 'dist/**/*') {
    moduleNames.push('dist/welcome');
    moduleNames.push('dist/app');
    moduleNames.push('dist/flickr');
    moduleNames.push('dist/nav');
  } else if (pattern == 'src/*') {
    moduleNames.push('src/a');
    moduleNames.push('src/b');
    moduleNames.push('src/c');
  }

  return Promise.resolve(moduleNames);
}
