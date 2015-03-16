var fs = require('fs');
var path = require('path');

var async = require('async');

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

var init = exports.init = function(program, destinationPath) {
  var args = [];

  args.push(OPTIONS.CREATE);
  args.push(destinationPath);

  if(!program.start) {
    args.push(OPTIONS.QUIT);
    args.push(OPTIONS.BATCHMODE);
  }

  RunService.Sync(checkUnityPath(program), args, function(code, signal) {
    if(code === 0) {
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
var installMethod = function(installations, program, args, asset) {
  installations.push(function(done) {
    RunService.Sync(checkUnityPath(program), args,
      function(code, signal) {
        if(code === 0) {
          done(null, 'Standard Asset "'+asset+'" installed');
        } else {
          done(new Error('Error'));
        }
      }
    );
  });
};

var install = exports.install = function(program) {
  var installations = [];
  var args = [];

  args.push(OPTIONS.QUIT);
  args.push(OPTIONS.BATCHMODE);

  if(program.standard) {
    // Install Standard Assets
    var standardAssetsPath = checkStandardAssetsPath(program);
    installations = [];

    for(var index in program.args) {
      var assetName = program.args[index];
      args = [];

      args.push(OPTIONS.QUIT);
      args.push(OPTIONS.BATCHMODE);

      // +".unitypackage"
      args.push(OPTIONS.IMPORTPACKAGE);
      args.push(path.join(standardAssetsPath, assetName+".unitypackage"));

      installMethod(installations, program, args, assetName);
    }

    async.series(installations, function(err, results) {
      if(err) console.log(err);
      if(results) console.log(results);
    });
  } else {

  }

  // var args = [];
  //
  // args.push(OPTIONS.CREATE);
  // args.push(destinationPath);
  //
  // if(!program.start) {
  //   args.push(OPTIONS.QUIT);
  //   args.push(OPTIONS.BATCHMODE);
  // }
  //
  // RunService.Sync(checkUnityPath(program), args,
  //   function(code, signal) {
  //     if(code === 0) {
  //       InitU3DAMService(program, destinationPath);
  //     }
  //   }
  // );

  // TODO
  // If Args are pathes - install normal dependencies
  // Else try to check registry

  // TODO
  // IF program.save - add each installed asset to u3dam.json
};
