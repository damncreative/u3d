var OPTIONS = require('./helpers/options.json');
var EXECUTEABLE_PATH = require('./helpers/executablePath')();
var stringUtil = require('./helpers/stringUtil');
var RunService = require('./services/run');

// var InstallService = require('./services/install');

// var install = exports.install = function(version, target, silent, callback) {
//   InstallService(version, target, silent, callback);
// };

var run = exports.run = function() {
  RunService.Unref(EXECUTEABLE_PATH);
}

var init = exports.init = function(program, path) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(path);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(EXECUTEABLE_PATH, args, RunService.defaultCallback);
};
