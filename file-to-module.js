var path = require('path');

function getModuleFromFile(filePath, baseURL){
  var name; 

  if(!filePath || !baseURL){
    throw new Error('Wrong input');
  }

  var pattern = new RegExp('^' + baseURL);

  if(!pattern.test(filePath)){
    throw new Error("Base path doesn't match");
  }

  name = filePath.replace(pattern, "");

  return name.replace(new RegExp(path.extname(name) + '$'), '');
}

exports.getModuleFromFile = getModuleFromFile;
