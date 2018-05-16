function spawnFactory(_namespace, _debugFabFactory) {
  var namespace = _namespace || '';
  var debugFabFactory = _debugFabFactory;

  if(!debugFabFactory){
    debugFabFactory = require('./debugFabFactory')();
  }

  function spawn(ns) {
    // this is this.debug (from Debugger)
    var dbg = new Debugger(this.namespace, ns);

    return dbg.debug;
  };

  function Debugger(_base, _ns){
    var base = _base || '';
    var ns = _ns || '';

    var newNs = ns ? [base, ns].join(':') : base;
    var debug = debugFabFactory(newNs);

    this.debug = debug;
    this.debug.spawn = spawn;
  }

  var rootDebug = (new Debugger(namespace)).debug;

  return rootDebug;
};

module.exports = spawnFactory;
