var util = require('util')
  , log
  , _logger
  , _levels
  , _serialize
  , _output;

_levels = {
  'debug': 'log'
, 'log' : 'log'
, 'info': 'info'
, 'notice': 'info'
, 'warning': 'warn'
, 'warn': 'warn'
, 'error': 'error'
, 'critical': 'error'
, 'alert': 'error'
, 'emergency': 'error'
};

_serialize = function (obj) {
  var out;
  if (typeof obj == 'string') {
    out = obj;
  }
  else {
    out = util.inspect(obj);
  }
  return out;
};

_output = function (obj, level) {
  var out = _serialize(obj);
  if (_logger) {
    _logger[level](out);
  }
  else {
    console[_levels[level]](out);
  }
};


log = function (obj) {
  _output(obj, 'info');
};

log.registerLogger = function (logger) {
  // Malkovitch, Malkovitch
  if (logger === log) {
    return;
  }
  _logger = logger;
};

(function () {
  var level;
  for (var p in _levels) {
    (function (p) {
      level = _levels[p];
      log[p] = function (obj) {
        _output(obj, p);
      };
    })(p);
  }
  // Also handle 'access', not an actual level
  log.access = log.info;
})();

module.exports = log;
