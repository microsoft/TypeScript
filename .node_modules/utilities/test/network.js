var assert = require('assert')
  , sys = require('sys')
  , net = require('net')
  , network = require('../lib/network')
  , tests;

tests = {

  'test a port is open': function (next) {
    var expected = false
      , port = 49152;

    network.isPortOpen(port, null, function (err, isOpen) {
      assert.ifError(err);
      assert.equal(expected, isOpen);

      next();
    });
    
  }

, 'test a port is closed': function (next) {
    
    var expected = true
      , port = 49153
      , server = net.createServer();

    server.listen(port, function () { 
      network.isPortOpen(port, null, function (err, isOpen) {
        assert.ifError(err);
        assert.equal(expected, isOpen);

        server.close(function () {
          next();  
        });
      });
    });  
  }
}

module.exports = tests;