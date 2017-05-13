// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x > y uses GetValue
 *
 * @path ch11/11.8/11.8.2/S11.8.2_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if (2 > 1 !== true) {
  $ERROR('#1: 2 > 1 === true');
}

//CHECK#2
var x = 2;
if (x > 1 !== true) {
  $ERROR('#2: var x = 2; x > 1 === true');
}

//CHECK#3
var y = 1;
if (2 > y !== true) {
  $ERROR('#3: var y = 1; 2 > y === true');
}

//CHECK#4
var x = 2;
var y = 1;
if (x > y !== true) {
  $ERROR('#4: var x = 2; var y = 1; x > y === true');
}

//CHECK#5
var objectx = new Object();
var objecty = new Object();
objectx.prop = 2;
objecty.prop = 1;
if (objectx.prop > objecty.prop !== true) {
  $ERROR('#5: var objectx = new Object(); var objecty = new Object(); objectx.prop = 2; objecty.prop = 1; objectx.prop > objecty.prop === true');
}

