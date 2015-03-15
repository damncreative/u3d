var sinon = require('sinon');
var rewire = require('rewire');

var executablePath = rewire('../lib/helpers/executablePath');
var PATHES = require('../lib/helpers/pathes.json');

var osMock = {};

describe('Helper: executablePath', function () {

	it('should return a String', function () {
    executablePath().should.be.an.instanceOf(String);
	});

  it('should return the Windows path', function() {
    osMock.platform = sinon.stub().returns('win32');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.WINDOWS);
  });

  it('should return the Linux path', function() {
    osMock.platform = sinon.stub().returns('linux');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.LINUX);
  });

  it('should return the OSX path', function() {
    osMock.platform = sinon.stub().returns('darwin');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.OSX);
  });
});
