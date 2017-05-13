// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x ? y : z uses GetValue
 *
 * @path ch11/11.12/S11.12_A2.1_T1.js
 * @description Either Type is not Reference or GetBase is not null
 */

//CHECK#1
if ((true ? false : true) !== false) {
  $ERROR('#1: (true ? false : true) === false');
}

//CHECK#2
if ((false ? false : true) !== true) {
  $ERROR('#2: (false ? false : true) === true');
}

//CHECK#3
var x = new Boolean(true);
var y = new Boolean(false);
if ((x ? y : true) !== y) {
  $ERROR('#3: var x = new Boolean(true); var y = new Boolean(false); (x ? y : true) === y');
}

//CHECK#4
var z = new Boolean(true);
if ((false ? false : z) !== z) {
  $ERROR('#4: var z = new Boolean(true); (false ? false : z) === z');
}

//CHECK#5
var x = new Boolean(true);
var y = new Boolean(false);
var z = new Boolean(true);
if ((x ? y : z) !== y) {
  $ERROR('#5: var x = new Boolean(true); var y = new Boolean(false); var z = new Boolean(true); (x ? y : z) === y');
}

//CHECK#6
var x = false;
var y = new Boolean(false);
var z = new Boolean(true);
if ((x ? y : z) !== z) {
  $ERROR('#6: var x = false; var y = new Boolean(false); var z = new Boolean(true); (x ? y : z) === z');
}

