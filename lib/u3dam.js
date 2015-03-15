var OPTIONS = require('./helpers/options.json');
var executablePath = require('./helpers/executablePath');
var EXECUTEABLE_PATH = executablePath.Unity();
var STANDARDASSETS_PATH = executablePath.StandardAssets();
var RunService = require('./services/run');

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

var init = exports.init = function(program, path) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(path);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(checkUnityPath(program), args, function(code, signal) {
    if(code == 0) {
      // Create U3DAM Default Assets
      // ProjectFolder:
      // - Assets (Folder)
      // - - U3DAMAssets (Folder)
      // - - - TargetDirName|DefinedName Assets (Folder)
      // - - U3DAMScripts
      // - - - U3DAM Default Testing Script
    }
  });
};

// AssetServer {ip}:{port} {projectname} {username} {password} {revision}
