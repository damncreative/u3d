var stringUtil = require('../lib/helpers/stringUtil');

describe('Helper: StringUtil', function() {
  it('should replace placeholder with values', function() {
    var placeholder = "{name} is {verb} with {othername}. {name} is {condition}.";
    var args = {
      name: "John",
      verb: "playing",
      othername: "Jane",
      condition: "happy"
    };
    var result = "John is playing with Jane. John is happy.";

    stringUtil.template(placeholder, args).should.be.eql(result);
  });
});
