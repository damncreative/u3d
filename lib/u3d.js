var path = require('path');

var root = __dirname + '/';
var OSVALUES = require('./helpers/osHelper')();

var RunService = require('./services/run');
var InstallService = require('./services/install');

var install = exports.install = function(version, target, silent, callback) {
  InstallService(version, target, silent, callback);
};

var run = exports.run = function() {
  RunService.Unref(path.join(OSVALUES.EDITOR.PATH, OSVALUES.EDITOR.EXE));
}
