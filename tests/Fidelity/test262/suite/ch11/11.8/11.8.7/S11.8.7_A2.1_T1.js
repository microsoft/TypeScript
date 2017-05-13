// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "in" uses GetValue
 *
 * @path ch11/11.8/11.8.7/S11.8.7_A2.1_T1.js
 * @description Either Expression is not Reference or GetBase is not null
 */

//CHECK#1
if ("MAX_VALUE" in Number !== true) {
  $ERROR('#1: "MAX_VALUE" in Number === true');
}

//CHECK#2
var x = "MAX_VALUE";
if (x in Number !== true) {
  $ERROR('#2: var x = "MAX_VALUE"; x in Number === true');
}

//CHECK#3
var y = Number;
if ("MAX_VALUE" in  y !== true) {
  $ERROR('#3: var y = Number; "MAX_VALUE" in y === true');
}

//CHECK#4
var x = "MAX_VALUE";
var y = Number;
if (x in y !== true) {
  $ERROR('#4: var x = "MAX_VALUE"; var y = Number; x in y === true');
}


