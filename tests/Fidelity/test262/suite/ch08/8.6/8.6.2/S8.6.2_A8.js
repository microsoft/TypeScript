// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch08/8.6/8.6.2/S8.6.2_A8.js
 * @description It should not be possible to change the [[Prototype]]
 * of a non-extensible object
 */

var x = Object.preventExtensions({});
var y = {};
try {
  x.__proto__ = y;
} catch (err) {
  // As far as this test is concerned, we allow the above assignment
  // to fail. This failure does violate the spec and should probably
  // be tested separately.
}
if (Object.getPrototypeOf(x) !== Object.prototype) {
  $ERROR("Prototype of non-extensible object mutated");
}

