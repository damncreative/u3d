var sinon = require('sinon');
var rewire = require('rewire');

var executablePath = rewire('../lib/helpers/executablePath');
var PATHES = require('../lib/helpers/pathes.json');

var osMock = {};

describe('Helper: executablePath', function () {

	describe('For Unity', function() {
		it('should return a String', function () {
	    executablePath.Unity().should.be.an.instanceOf(String);
		});

	  it('should return the Windows 32Bit path', function() {
	    osMock.platform = sinon.stub().returns('win32');
			osMock.arch = sinon.stub().returns('ia32');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.Unity().should.be.eql(PATHES.EXECUTABLE.WINDOWS.V_32);
	  });

		it('should return the Windows 64Bit path', function() {
	    osMock.platform = sinon.stub().returns('win32');
			osMock.arch = sinon.stub().returns('x64');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.Unity().should.be.eql(PATHES.EXECUTABLE.WINDOWS.V_64);
	  });

	  it('should return the Linux path', function() {
	    osMock.platform = sinon.stub().returns('linux');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.Unity().should.be.eql(PATHES.EXECUTABLE.LINUX);
	  });

	  it('should return the OSX path', function() {
	    osMock.platform = sinon.stub().returns('darwin');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.Unity().should.be.eql(PATHES.EXECUTABLE.OSX);
	  });
	});

	describe('For Standard Assets', function() {
		it('should return a String', function () {
	    executablePath.StandardAssets().should.be.an.instanceOf(String);
		});

	  it('should return the Windows 32Bit path', function() {
	    osMock.platform = sinon.stub().returns('win32');
			osMock.arch = sinon.stub().returns('ia32');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.StandardAssets().should.be.eql(PATHES.STANDARDASSETS.WINDOWS.V_32);
	  });

		it('should return the Windows 64Bit path', function() {
	    osMock.platform = sinon.stub().returns('win32');
			osMock.arch = sinon.stub().returns('x64');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.StandardAssets().should.be.eql(PATHES.STANDARDASSETS.WINDOWS.V_64);
	  });

	  it('should return the Linux path', function() {
	    osMock.platform = sinon.stub().returns('linux');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.StandardAssets().should.be.eql(PATHES.STANDARDASSETS.LINUX);
	  });

	  it('should return the OSX path', function() {
	    osMock.platform = sinon.stub().returns('darwin');
	    executablePath.__set__({
	        'os': osMock
	    });

	    executablePath.StandardAssets().should.be.eql(PATHES.STANDARDASSETS.OSX);
	  });
	});
});
