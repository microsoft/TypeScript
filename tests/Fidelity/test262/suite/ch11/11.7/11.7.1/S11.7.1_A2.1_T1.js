// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x << y uses GetValue
 *
 * @path ch11/11.7/11.7.1/S11.7.1_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if (2 << 1 !== 4) {
  $ERROR('#1: 2 << 1 === 4. Actual: ' + (2 << 1));
}

//CHECK#2
var x = 2;
if (x << 1 !== 4) {
  $ERROR('#2: var x = 2; x << 1 === 4. Actual: ' + (x << 1));
}

//CHECK#3
var y = 1;
if (2 << y !== 4) {
  $ERROR('#3: var y = 2; 2 << y === 4. Actual: ' + (2 << y));
}

//CHECK#4
var x = 2;
var y = 1;
if (x << y !== 4) {
  $ERROR('#4: var x = 2; var y = 1; x << y === 4. Actual: ' + (x << y));
}

//CHECK#5
var objectx = new Object();
var objecty = new Object();
objectx.prop = 2;
objecty.prop = 1;
if (objectx.prop << objecty.prop !== 4) {
  $ERROR('#5: var objectx = new Object(); var objecty = new Object(); objectx.prop = 2; objecty.prop = 1; objectx.prop << objecty.prop === 4. Actual: ' + (objectx.prop << objecty.prop));
}

