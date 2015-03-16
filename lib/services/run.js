var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

exports = module.exports;

var out = null;
var err = null;

var outLogPath = path.join(__dirname, '../../log/out.log');
var errLogPath = path.join(__dirname, '../../log/err.log');

var checkLogs = function() {
  out = fs.openSync(outLogPath, 'w');
  err = fs.openSync(errLogPath, 'w');
};

exports.Sync = function(app, argv, callback) {
  checkLogs();
  console.log('Spawning: '+app+' '+argv.join(" "));
  var pcs = child_process.spawn(app, argv);
  pcs.stdout.on('data', function(data){
    console.log(data);
  });
  pcs.stderr.on('data', function(data){
    console.log(data);
  });
  pcs.on('close', function (code, signal) {
    console.log('child process exited with code ' + code);
    callback(code, signal);
  });
};

exports.Async = function(app, argv) {
  checkLogs();
};

exports.Unref = function(app, argv) {
  checkLogs();
  if(argv === null) {
    argv = [];
  }
  argv[argv.length] = '>>'+outLogPath;
  argv[argv.length+1] = '2>>'+errLogPath;

  var child = child_process.spawn(app, argv, {
    detached: true,
    stdio: [ 'ignore', out, err ]
  });
  child.unref();
};

exports.defaultCallback = function(code, signal) {};
