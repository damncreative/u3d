var fs = require('fs');
var path = require('path');

var _ = require('underscore');
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = function(program) {
  // Create u3dam.json at destination
  var u3damJson = fs.readFileSync(
    path.join(__dirname, '../templates/u3dam.json'),
    {"encoding":"UTF-8"});

  var template = _.template(u3damJson);
  fs.writeFile(
    path.join(program.destinationPath, 'u3dam.json'),
    template({
      name: path.basename(program.destinationPath)
    }));

  // Inject some Editor Scripts?
};
