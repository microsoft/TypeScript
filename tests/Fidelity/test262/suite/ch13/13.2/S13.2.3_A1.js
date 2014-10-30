// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch13/13.2/S13.2.3_A1.js
 * @description check that all poisoning use the [[ThrowTypeError]]
 * function object.
 * @onlyStrict
 */

"use strict";
var poison = Object.getOwnPropertyDescriptor(function() {}, 'caller').get;

if (typeof poison !== 'function') {
  $ERROR("#1: A strict function's .caller should be poisoned with a function");
}
var threw = null;
try {
  poison();
} catch (err) {
  threw = err;
}
if (!threw || !(threw instanceof TypeError)) {
  $ERROR("#2: Poisoned property should throw TypeError");
}

function checkPoison(obj, name) {
  var desc = Object.getOwnPropertyDescriptor(obj, name);
  if (desc.enumerable) {
    $ERROR("#3: Poisoned " + name + " should not be enumerable");
  }
  if (desc.configurable) {
    $ERROR("#4: Poisoned " + name + " should not be configurable");
  }
  if (poison !== desc.get) {
    $ERROR("#5: " + name + "'s getter not poisoned with same poison");
  }
  if (poison !== desc.set) {
    $ERROR("#6: " + name + "'s setter not poisoned with same poison");
  }
}

checkPoison(function() {}, 'caller');
checkPoison(function() {}, 'arguments');
checkPoison((function() { return arguments; })(), 'caller');
checkPoison((function() { return arguments; })(), 'callee');
checkPoison((function() {}).bind(null), 'caller');
checkPoison((function() {}).bind(null), 'arguments');

