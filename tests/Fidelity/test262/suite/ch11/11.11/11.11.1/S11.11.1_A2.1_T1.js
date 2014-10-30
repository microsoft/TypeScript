// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x && y uses GetValue
 *
 * @path ch11/11.11/11.11.1/S11.11.1_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if ((false && true) !== false) {
  $ERROR('#1: (false && true) === false');
}

//CHECK#2
if ((true && false) !== false) {
  $ERROR('#2: (true && false) === false');
}

//CHECK#3
var x = false;
if ((x && true) !== false) {
  $ERROR('#3: var x = false; (x && true) === false');
}

//CHECK#4
var y = new Boolean(false);
if ((true && y) !== y) {
  $ERROR('#4: var y = new Boolean(false); (true && y) === y');
}

//CHECK#5
var x = false;
var y = true;
if ((x && y) !== false) {
  $ERROR('#5: var x = false; var y = true; (x && y) === false');
}

//CHECK#6
var x = true;
var y = new Boolean(false);
if ((x && y) !== y) {
  $ERROR('#6: var x = true; var y = new Boolean(false); (x && y) === y');
}

//CHECK#7
var objectx = new Object();
var objecty = new Object();
objectx.prop = true;
objecty.prop = 1.1;
if ((objectx.prop && objecty.prop) !== objecty.prop) {
  $ERROR('#7: var objectx = new Object(); var objecty = new Object(); objectx.prop = true; objecty.prop = 1; (objectx.prop && objecty.prop) === objecty.prop');
}

//CHECK#8
var objectx = new Object();
var objecty = new Object();
objectx.prop = 0;
objecty.prop = true;
if ((objectx.prop && objecty.prop) !== objectx.prop) {
  $ERROR('#8: var objectx = new Object(); var objecty = new Object(); objectx.prop = 0; objecty.prop = true; (objectx.prop && objecty.prop) === objectx.prop');
}

