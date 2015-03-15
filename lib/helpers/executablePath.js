var os = require('os');
var PATHES = require('./pathes.json');

module.exports = function() {
  switch(os.platform()) {
    case 'win32':
      if(os.arch() == 'x64')
        return PATHES.EXECUTABLE.WINDOWS.V_64;
      else
      return PATHES.EXECUTABLE.WINDOWS.V_32;
    case 'linux':
      return PATHES.EXECUTABLE.LINUX;
    case 'darwin':
      return PATHES.EXECUTABLE.OSX;
  }
};
