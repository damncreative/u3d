var OPTIONS = require('./helpers/options.json');
var executablePath = require('./helpers/executablePath');
var EXECUTEABLE_PATH = executablePath.Unity();
var STANDARDASSETS_PATH = executablePath.StandardAssets();
var stringUtil = require('./helpers/stringUtil');
var RunService = require('./services/run');

// var InstallService = require('./services/install');

// var install = exports.install = function(version, target, silent, callback) {
//   InstallService(version, target, silent, callback);
// };

var checkUnityPath = function(program) {
  if(program.unity) {
    return program.unity;
  } else {
    return EXECUTEABLE_PATH;
  }
};

var checkStandardAssetsPath = function(program) {
  if(program.assets) {
    return program.unity;
  } else {
    return STANDARDASSETS_PATH;
  }
};

var run = exports.run = function(program, path) {
  var args = [];
  if(path) {
    args.push(OPTIONS.PROJECTPATH)
    args.push(path);
  }

  if(program.target) {
    args.push(OPTIONS.BUILDTARGET);
    args.push(program.target);
  }

  RunService.Unref(checkUnityPath(program), args);
}

var init = exports.init = function(program, path) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(path);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(checkUnityPath(program), args, RunService.defaultCallback);
};

var build = exports.build = function(program, path) {
  var args = [];

  args.push(OPTIONS.QUIT);
  args.push(OPTIONS.BATCHMODE);

  RunService.Sync(checkUnityPath(program), args, RunService.defaultCallback);
};
