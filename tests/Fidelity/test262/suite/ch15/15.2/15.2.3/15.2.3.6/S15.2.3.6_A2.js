// Copyright 2011 Google Inc.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch15/15.2/15.2.3/15.2.3.6/S15.2.3.6_A2.js
 * @description Checks if an inherited accessor property appears to be
 * an own property.
 */

var base = {};
var derived = Object.create(base);
function getter() { return 'gotten'; }
Object.defineProperty(base, 'foo', {get: getter});
if (derived.hasOwnProperty('foo')) {
  $ERROR('Accessor properties inherit as own properties');
}

