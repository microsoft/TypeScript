function arrayOrFunction(arrayOrFunc, env) {
  if (typeof arrayOrFunc === 'function') {
    return arrayOrFunc.call(this, env);
  }
  if (Array.isArray(arrayOrFunc)) {
    return arrayOrFunc;
  }
  if (typeof arrayOrFunc === 'string') {
    return [arrayOrFunc];
  }
  return [];
}

function fromReorderedArgv(reorderedArgv) {
  var nodeFlags = [];
  for (var i = 1, n = reorderedArgv.length; i < n; i++) {
    var arg = reorderedArgv[i];
    if (!/^-/.test(arg) || arg === '--') {
      break;
    }
    nodeFlags.push(arg);
  }
  return nodeFlags;
}

module.exports = {
  arrayOrFunction: arrayOrFunction,
  fromReorderedArgv: fromReorderedArgv,
};

