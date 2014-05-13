var util = require('util');
var os = require('os');

module.exports = function(version, callback) {
  // Download Module
  var dlService = require('downloader');
  var mkdirp = require('mkdirp');

  // Get OS Format of File
  var osformat = '';
  if(os.type().indexOf('Win') != -1) osformat = 'exe';
  if(os.type().indexOf('Mac') != -1) osformat = 'dmg';

  if(osformat.length == 0) {
    var error = new Error('OS not supported');
    return callback(error);
  }

  //Current Unity3D URL
  var currentUnity3DUrl = 'http://netstorage.unity3d.com/unity/UnitySetup-%s.%s';

  //file Url & destination Path
  var fileUrl = util.format(currentUnity3DUrl, version, osformat);
  var destinationPath = os.tmpdir() + '/u3d/';

  mkdirp(destinationPath, function(err) {
    if(err) callback(err);
    dlService.on('done', function(msg) {
      var data = {};
      data.msg = msg;
      data.fileUrl = fileUrl;
      data.destinationPath = destinationPath;

      callback(null, data);
    });

    dlService.on('error', function(msg) {
      callback(msg, null);
    });

    dlService.download(fileUrl, destinationPath);
  });
}