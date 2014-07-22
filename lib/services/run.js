var child_process = require('child_process');
var fs = require('fs');

var out = fs.openSync('.../../log/u3d-out.log', 'a');
var err = fs.openSync('.../../log/u3d-err.log', 'a');

exports = module.exports;

exports.Sync = function(app, argv) {
  var pcs = child_process.spawn(app, argv);
  pcs.stdout.on('data', function(data){
    console.log(data);
  });
  pcs.stderr.on('data', function(data){
    console.log(data);
  });
  pcs.on('close', function (code) {
    console.log('child process exited with code ' + code);
  });
};

exports.Async = function(app, argv) {

};

exports.Unref = function(app, argv) {

  var child = child_process.spawn(app, argv, {
    detached: true,
    stdio: [ 'ignore', out, err ]
  });
  child.unref();
};