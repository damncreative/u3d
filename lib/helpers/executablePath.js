var os = require('os');
var PATHES = require('./pathes.json');

module.exports = function() {
  switch(os.platform()) {
    case 'win32':
      return PATHES.WINDOWS;
    case 'linux':
      return PATHES.LINUX;
    case 'darwin':
      return PATHES.OSX;
  }
};
