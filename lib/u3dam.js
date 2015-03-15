var OPTIONS = require('./helpers/options.json');
var EXECUTEABLE_PATH = require('./helpers/executablePath')();
var RunService = require('./services/run');

var init = exports.init = function(program, path) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(path);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(EXECUTEABLE_PATH, args, function(code, signal) {
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
