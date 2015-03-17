var path = require('path');

var OPTIONS = require('./helpers/options.json');
var executablePath = require('./helpers/executablePath');

var EXECUTEABLE_PATH = executablePath.Unity();
var STANDARDASSETS_PATH = executablePath.StandardAssets();

var stringUtil = require('./helpers/stringUtil');
var RunService = require('./services/run');
var InitU3DAMService = require('./services/init_u3dam');


module.exports = function(program) {
  if(!program.unity) program.unity = executablePath.Unity();
  if(!program.assets) program.assets = executablePath.StandardAssets();

  // ==== destination
  var relativePath = program.args.shift();
  program.destinationPath = "";
  if(relativePath) {
    program.destinationPath = path.join(process.cwd(), relativePath);
  } else {
    program.destinationPath = process.cwd();
  }

  program.RunService = RunService;
  program.stringUtil = stringUtil;
  program.InitU3DAMService = InitU3DAMService;
  program.OPTIONS = OPTIONS;
};


// var InstallService = require('./services/install');

// var install = exports.install = function(version, target, silent, callback) {
//   InstallService(version, target, silent, callback);
// };
//
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


var init = exports.init = function(program, destinationPath) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(destinationPath);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(checkUnityPath(program), args,
    function(code, signal) {
      if(code === 0) {
        InitU3DAMService(program, destinationPath);
      }
    }
  );
};

var build = exports.build = function(program, projectPath) {
  var BUILDPATH = path.relative(projectPath, program.path);

  // console.log(program.name);
  // console.log(program.path);
  // console.log(BUILDPATH);

  var args = [];

  args.push(OPTIONS.QUIT);
  args.push(OPTIONS.BATCHMODE);

  args.push(OPTIONS.PROJECTPATH);
  args.push(projectPath);

  if(program.linux) {
    args.push(OPTIONS.BUILDPLAYER.LINUX.V_UNI);
    args.push(path.join(BUILDPATH, "LINUX", program.name));
  }
  if(program.linux32) {
    args.push(OPTIONS.BUILDPLAYER.LINUX.V_32);
    args.push(path.join(BUILDPATH, "LINUX32", program.name));
  }
  if(program.linux64) {
    args.push(OPTIONS.BUILDPLAYER.LINUX.V_64);
    args.push(path.join(BUILDPATH, "LINUX64", program.name));
  }
  if(program.win32) {
    args.push(OPTIONS.BUILDPLAYER.WINDOWS.V_32);
    args.push(path.join(BUILDPATH, "WINDOWS32", program.name));
  }
  if(program.win64) {
    args.push(OPTIONS.BUILDPLAYER.WINDOWS.V_64);
    args.push(path.join(BUILDPATH, "WINDOWS64", program.name));
  }
  if(program.osx) {
    args.push(OPTIONS.BUILDPLAYER.OSX.V_UNI);
    args.push(path.join(BUILDPATH, "OSX", program.name));
  }
  if(program.osx32) {
    args.push(OPTIONS.BUILDPLAYER.OSX.V_32);
    args.push(path.join(BUILDPATH, "OSX32", program.name));
  }
  if(program.osx64) {
    args.push(OPTIONS.BUILDPLAYER.OSX.V_64);
    args.push(path.join(BUILDPATH, "OSX64", program.name));
  }
  if(program.web) {
    args.push(OPTIONS.BUILDPLAYER.WEB.V_N);
    args.push(path.join(BUILDPATH, "WEB", program.name));
  }
  if(program.stream) {
    args.push(OPTIONS.BUILDPLAYER.WEB.V_S);
    args.push(path.join(BUILDPATH, "STREAM", program.name));
  }

  RunService.Sync(checkUnityPath(program), args, RunService.defaultCallback);
};
