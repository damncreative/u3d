var os = require('os');
var PATHES = require('./pathes.json');

exports.Unity = function() {
  switch(os.platform()) {
    case 'win32':
      if(os.arch() == 'x64')
        return PATHES.EXECUTABLE.WINDOWS.V_64;
      return PATHES.EXECUTABLE.WINDOWS.V_32;
    case 'linux':
      return PATHES.EXECUTABLE.LINUX;
    case 'darwin':
      return PATHES.EXECUTABLE.OSX;
  }
};

exports.StandardAssets = function() {
  switch(os.platform()) {
    case 'win32':
      if(os.arch() == 'x64')
        return PATHES.STANDARDASSETS.WINDOWS.V_64;
      return PATHES.STANDARDASSETS.WINDOWS.V_32;
    case 'linux':
      return PATHES.STANDARDASSETS.LINUX;
    case 'darwin':
      return PATHES.STANDARDASSETS.OSX;
  }
};
