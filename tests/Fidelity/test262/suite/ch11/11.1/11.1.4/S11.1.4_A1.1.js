// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Evaluate the production ArrayLiteral: [ ]
 *
 * @path ch11/11.1/11.1.4/S11.1.4_A1.1.js
 * @description Checking various properties of the array defined with expression "var array = []"
 */

var array = [];

//CHECK#1
if (typeof array !== "object") {
  $ERROR('#1: var array = []; typeof array === "object". Actual: ' + (typeof array));
}

//CHECK#2
if (array instanceof Array !== true) {
  $ERROR('#2: var array = []; array instanceof Array === true');
}

//CHECK#3
if (array.toString !== Array.prototype.toString) {
  $ERROR('#3: var array = []; array.toString === Array.prototype.toString. Actual: ' + (array.toString));
}

//CHECK#4
if (array.length !== 0) {
  $ERROR('#4: var array = []; array.length === 0. Actual: ' + (array.length));
}

