'use strict';

var normalize = require('value-or-function');

var slice = Array.prototype.slice;

function createResolver(config, options) {
  // TODO: should the config object be validated?
  config = config || {};
  options = options || {};

  var resolver = {
    resolve: resolve,
  };


  // Keep constants separately
  var constants = {};

  function resolveConstant(key) {
    if (constants.hasOwnProperty(key)) {
      return constants[key];
    }

    var definition = config[key];
    // Ignore options that are not defined
    if (!definition) {
      return;
    }

    var option = options[key];

    if (option != null) {
      if (typeof option === 'function') {
        return;
      }
      option = normalize.call(resolver, definition.type, option);
      if (option != null) {
        constants[key] = option;
        return option;
      }
    }

    var fallback = definition.default;
    if (option == null && typeof fallback !== 'function') {
      constants[key] = fallback;
      return fallback;
    }
  }


  // Keep requested keys to detect (and disallow) recursive resolution
  var stack = [];

  function resolve(key) {
    var option = resolveConstant(key);
    if (option != null) {
      return option;
    }

    var definition = config[key];
    // Ignore options that are not defined
    if (!definition) {
      return;
    }

    if (stack.indexOf(key) >= 0) {
      throw new Error('Recursive resolution denied.');
    }

    option = options[key];
    var fallback = definition.default;
    var appliedArgs = slice.call(arguments, 1);
    var args = [definition.type, option].concat(appliedArgs);

    function toResolve() {
      stack.push(key);
      var option = normalize.apply(resolver, args);

      if (option == null) {
        option = fallback;
        if (typeof option === 'function') {
          option = option.apply(resolver, appliedArgs);
        }
      }

      return option;
    }

    function onResolve() {
      stack.pop();
    }

    return tryResolve(toResolve, onResolve);
  }


  return resolver;
}


function tryResolve(toResolve, onResolve) {
  try {
    return toResolve();
  } finally {
    onResolve();
  }
}


module.exports = createResolver;
