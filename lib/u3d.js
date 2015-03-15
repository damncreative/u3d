var path = require('path');

var root = __dirname + '/';
var EXECUTEABLE_PATH = require('./helpers/executablePath')();

var RunService = require('./services/run');
var InstallService = require('./services/install');

// var install = exports.install = function(version, target, silent, callback) {
//   InstallService(version, target, silent, callback);
// };

var run = exports.run = function() {
  RunService.Unref(EXECUTEABLE_PATH);
}
