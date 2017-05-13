// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x || y uses GetValue
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if ((true || false) !== true) {
  $ERROR('#1: (true || false) === true');
}

//CHECK#2
if ((false || true) !== true) {
  $ERROR('#2: (false || true) === true');
}

//CHECK#3
var x = new Boolean(false);
if ((x || true) !== x) {
  $ERROR('#3: var x = Boolean(false); (x || true) === x');
}

//CHECK#4
var y = new Boolean(true);
if ((false || y) !== y) {
  $ERROR('#4: var y = Boolean(true); (false || y) === y');
}

//CHECK#5
var x = new Boolean(false);
var y = new Boolean(true);
if ((x || y) !== x) {
  $ERROR('#5: var x = new Boolean(false); var y = new Boolean(true); (x || y) === x');
}

//CHECK#6
var x = false;
var y = new Boolean(true);
if ((x || y) !== y) {
  $ERROR('#6: var x = false; var y = new Boolean(true); (x || y) === y');
}

//CHECK#7
var objectx = new Object();
var objecty = new Object();
objectx.prop = false;
objecty.prop = 1.1;
if ((objectx.prop || objecty.prop) !== objecty.prop) {
  $ERROR('#7: var objectx = new Object(); var objecty = new Object(); objectx.prop = false; objecty.prop = 1; (objectx.prop || objecty.prop) === objecty.prop');
}

//CHECK#8
var objectx = new Object();
var objecty = new Object();
objectx.prop = 1.1;
objecty.prop = false;
if ((objectx.prop || objecty.prop) !== objectx.prop) {
  $ERROR('#8: var objectx = new Object(); var objecty = new Object(); objectx.prop = 1.1; objecty.prop = false; (objectx.prop || objecty.prop) === objectx.prop');
}

