// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x < y uses GetValue
 *
 * @path ch11/11.8/11.8.1/S11.8.1_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if (1 < 2 !== true) {
  $ERROR('#1: 1 < 2 === true');
}

//CHECK#2
var x = 1;
if (x < 2 !== true) {
  $ERROR('#2: var x = 1; x < 2 === true');
}

//CHECK#3
var y = 2;
if (1 < y !== true) {
  $ERROR('#3: var y = 2; 1 < y === true');
}

//CHECK#4
var x = 1;
var y = 2;
if (x < y !== true) {
  $ERROR('#4: var x = 1; var y = 2; x < y === true');
}

//CHECK#5
var objectx = new Object();
var objecty = new Object();
objectx.prop = 1;
objecty.prop = 2;
if (objectx.prop < objecty.prop !== true) {
  $ERROR('#5: var objectx = new Object(); var objecty = new Object(); objectx.prop = 1; objecty.prop = 2; objectx.prop < objecty.prop === true');
}

