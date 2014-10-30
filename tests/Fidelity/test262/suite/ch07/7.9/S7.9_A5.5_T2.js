// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check Function Expression for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A5.5_T2.js
 * @description Try use function f(o) {o.x = 1; return o;}; \n (new Object()).x; construction
 */

//CHECK#1
var result = function f(o) {o.x = 1; return o;};
(new Object()).x;
if (typeof result !== "function") {
  $ERROR('#1: Check Function Expression for automatic semicolon insertion');
}

