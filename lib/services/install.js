var util = require('util');
var os = require('os');
var fs = require('fs');
var path = require('path');
var http = require('http');

var ProgressBar = require('progress');
var mkdirp = require('mkdirp');

module.exports = function(version, callback) {
  // setup destinationDir in OS temp directory
  var destinationDir = path.join(os.tmpdir(), 'u3d');

  mkdirp(destinationDir, function(err) {
    if(err) return callback(err);
    var fileName = getFileName(version, callback);
    if(fileName != null) {
      checkTempDir(destinationDir, fileName);
      download(version, destinationDir, fileName, callback);
    }
  });
};

function getFileName(version, callback) {
  // Get OS Format of executable Files
  var osformat = '';
  if(os.type().indexOf('Win') != -1) osformat = 'exe';
  if(os.type().indexOf('Mac') != -1) osformat = 'dmg';
  if(osformat.length == 0) {
    // e.g. Linux? SmartOS?
    var error = new Error('OS not supported');
    callback(error);
    return null;
  }

  // build fileName / Path
  var file = util.format('UnitySetup.%s', osformat); // take newest version
  if(typeof version !== "undefined" && version !== null) {
    // version test
    var pattern = /([0-9].[0-9].[0-9])/g;
    var versionTestResult = pattern.test(version);
    if(versionTestResult) {
      file = util.format('UnitySetup-%s.%s', version, osformat);  // take specific version
    }
  }
  return file;
}

function checkTempDir(destinationDir, fileName) {
  var file = path.join(destinationDir, fileName);
  if(fs.existsSync(file)) {
    fs.unlinkSync(file);
  }
}

function download(version, destinationDir, fileName, callback) {
  var file = path.join(destinationDir, fileName);
  // Stream for Destination File
  var writeStream = fs.createWriteStream(file, {flags: 'a'});

  // init request
  var req = http.request({
    host: 'netstorage.unity3d.com',
    port: 80,
    path: '/unity/'+fileName
  });

  // setup event handler
  req.on('response', function(res){
    var len = parseInt(res.headers['content-length'], 10);
    // Empty Line
    console.log();
    var bar = new ProgressBar('  downloading [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: len
    });

    res.on('data', function (chunk) {
      bar.tick(chunk.length);
      writeStream.write(chunk, encoding='binary');
    });

    res.on('end', function (err) {
      console.log('\n');
      // IF 404
      if(res.statusCode != 404) {
        callback(404, null);
      } else {
        install(file, callback);
      }
    });
  });

  req.end();
}

function install(file, callback) {
  console.log("Install: " + file);
}