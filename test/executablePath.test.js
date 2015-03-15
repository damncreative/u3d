var sinon = require('sinon');
var rewire = require('rewire');

var executablePath = rewire('../lib/helpers/executablePath');
var PATHES = require('../lib/helpers/pathes.json');

var osMock = {};

describe('Helper: executablePath', function () {

	it('should return a String', function () {
    executablePath().should.be.an.instanceOf(String);
	});

  it('should return the Windows 32Bit path', function() {
    osMock.platform = sinon.stub().returns('win32');
		osMock.arch = sinon.stub().returns('ia32');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.EXECUTABLE.WINDOWS.V_32);
  });

	it('should return the Windows 64Bit path', function() {
    osMock.platform = sinon.stub().returns('win32');
		osMock.arch = sinon.stub().returns('x64');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.EXECUTABLE.WINDOWS.V_64);
  });

  it('should return the Linux path', function() {
    osMock.platform = sinon.stub().returns('linux');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.EXECUTABLE.LINUX);
  });

  it('should return the OSX path', function() {
    osMock.platform = sinon.stub().returns('darwin');
    executablePath.__set__({
        'os': osMock
    });

    executablePath().should.be.eql(PATHES.EXECUTABLE.OSX);
  });
});
