var os = require('os');
var fs = require('fs');
var path = require('path');

var env = process.env;
var pathToFiles = path.join(__dirname, 'files.json');
var FILES = require(pathToFiles);

var search = exports = module.exports = function() {
  switch(os.platform()) {
    case 'win32':
      return windows();
    case 'linux':
      return linux();
    case 'darwin':
      return osx();
  }
};

function windows() {
  var programFiles86 = env['ProgramFiles(x86)'];
  var programFiles = env['ProgramFiles'];

  return lookFor(programFiles86, programFiles);
}

function linux() {
  // TODO coming soon
}

function osx() {
  // TODO coming soon
}

function lookFor() {
  var OSValues = getValuesForOS();

  for (var i = 0; i < arguments.length; i++) {
    var p = path.join(arguments[i], OSValues.EDITOR.RELATIVEPATH, OSValues.EDITOR.BINARYPATH);
    if(exist(p)) {
      OSValues.EDITOR.PATH = p;
      OSValues.MONO.PATH = path.join(arguments[i], OSValues.MONO.RELATIVEPATH, OSValues.MONO.BINARYPATH);
    }
  };

  return OSValues;
}

function getValuesForOS() {
  switch(os.platform()) {
    case 'win32':
      return FILES.WINDOWS;
    case 'linux':
      return FILES.LINUX;
    case 'darwin':
      return FILES.OSX;
  }
}

function exist(p) {
  return fs.existsSync(p);
}