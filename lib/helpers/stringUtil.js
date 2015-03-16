var interpolate = /\{(.+?)\}/g;

exports.template = function(value, args) {
  var match;
  while((match = interpolate.exec(value))) {
    var placeholder = match[0];
    var key = match[1];
    var replacement = args[key];
    if(replacement.length > 0) {
      var replacer = new RegExp(placeholder, "g");
      value = value.replace(replacer, replacement);
    }
  }

  return value;
};
