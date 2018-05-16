module.exports = function debugFactory(_debugApi, _options) {
  var wrapLazyEval = require('./lazy-eval');
  var formatArgs = require('./formatArgs');

  var options = _options || {
    formatArgs: true
  };

  var debugApi = _debugApi ? _debugApi : require('debug');
  debugApi = wrapLazyEval(debugApi);

  debugApi = formatArgs({
    debugApi: debugApi,
    options: options
  });

  return debugApi;
}
