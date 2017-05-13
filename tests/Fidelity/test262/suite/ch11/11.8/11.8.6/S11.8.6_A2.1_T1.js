// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator "instanceof" uses GetValue
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A2.1_T1.js
 * @description Either Expression is not Reference or GetBase is not null
 */

//CHECK#1
if (({}) instanceof Object !== true) {
  $ERROR('#1: ({}) instanceof Object === true');
}

//CHECK#2
var object = {};
if (object instanceof Object !== true) {
  $ERROR('#2: var object = {}; object instanceof Object === true');
}

//CHECK#3
var OBJECT = Object;
if (({}) instanceof OBJECT !== true) {
  $ERROR('#3: var OBJECT = Object; ({}) instanceof OBJECT === true');
}

//CHECK#4
var object = {};
var OBJECT = Object;
if (object instanceof OBJECT !== true) {
  $ERROR('#4: var object = {}; var OBJECT = Object; object instanceof OBJECT === true');
}


