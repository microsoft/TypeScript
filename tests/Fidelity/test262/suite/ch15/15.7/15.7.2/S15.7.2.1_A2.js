// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Prototype]] property of the newly constructed object
 * is set to the original Number prototype object, the one that is the
 * initial value of Number.prototype
 *
 * @path ch15/15.7/15.7.2/S15.7.2.1_A2.js
 * @description Checking prototype property of the newly created objects
 */

// CHECK#1
var x1 = new Number(1);
if (typeof x1.constructor.prototype !== "object") {
  $ERROR('#1: typeof x1.constructor.prototype === "object"');
}

//CHECK#2
var x2 = new Number(2);
if (!Number.prototype.isPrototypeOf(x2)) {
  $ERROR('#2: Number.prototype.isPrototypeOf(x2)');
}

//CHECK#3
var x3 = new Number(3);
if (Number.prototype !== x3.constructor.prototype) {
  $ERROR('#3: Number.prototype === x3.constructor.prototype');
}

