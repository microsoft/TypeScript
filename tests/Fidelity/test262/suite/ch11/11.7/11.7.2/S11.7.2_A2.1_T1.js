// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x >> y uses GetValue
 *
 * @path ch11/11.7/11.7.2/S11.7.2_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if (-4 >> 1 !== -2) {
  $ERROR('#1: -4 >> 1 === -2. Actual: ' + (-4 >> 1));
}

//CHECK#2
var x = -4;
if (x >> 1 !== -2) {
  $ERROR('#2: var x = -4; x >> 1 === -2. Actual: ' + (x >> 1));
}

//CHECK#3
var y = 1;
if (-4 >> y !== -2) {
  $ERROR('#3: var y = 1; -4 >> y === -2. Actual: ' + (-4 >> y));
}

//CHECK#4
var x = -4;
var y = 1;
if (x >> y !== -2) {
  $ERROR('#4: var x = -4; var y = 1; x >> y === -2. Actual: ' + (x >> y));
}

//CHECK#5
var objectx = new Object();
var objecty = new Object();
objectx.prop = -4;
objecty.prop = 1;
if (objectx.prop >> objecty.prop !== -2) {
  $ERROR('#5: var objectx = new Object(); var objecty = new Object(); objectx.prop = -4; objecty.prop = 1; objectx.prop >> objecty.prop === -2. Actual: ' + (objectx.prop >> objecty.prop));
}

