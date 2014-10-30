// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x <= y returns ToNumber(x) <= ToNumber(y), if Type(Primitive(x)) is not String or Type(Primitive(y)) is not String
 *
 * @path ch11/11.8/11.8.3/S11.8.3_A3.1_T1.1.js
 * @description Type(Primitive(x)) and Type(Primitive(y)) vary between primitive boolean and Boolean object
 */

//CHECK#1
if (true <= true !== true) {
  $ERROR('#1: true <= true === true');
}

//CHECK#2
if (new Boolean(true) <= true !== true) {
  $ERROR('#2: new Boolean(true) <= true === true');
}

//CHECK#3
if (true <= new Boolean(true) !== true) {
  $ERROR('#3: true <= new Boolean(true) === true');
}

//CHECK#4
if (new Boolean(true) <= new Boolean(true) !== true) {
  $ERROR('#4: new Boolean(true) <= new Boolean(true) === true');
}

