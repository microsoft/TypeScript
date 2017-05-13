// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(Primitive(x)) is not String or Type(Primitive(y)) is not String, then operator x > y returns ToNumber(x) > ToNumber(y)
 *
 * @path ch11/11.8/11.8.2/S11.8.2_A3.1_T2.4.js
 * @description Type(Primitive(x)) is different from Type(Primitive(y)) and both types vary between Number (primitive or object) and Undefined
 */

//CHECK#1
if (1 > undefined !== false) {
  $ERROR('#1: 1 > undefined === false');
}

//CHECK#2
if (undefined > 1 !== false) {
  $ERROR('#2: undefined > 1 === false');
}

//CHECK#3
if (new Number(1) > undefined !== false) {
  $ERROR('#3: new Number(1) > undefined === false');
}

//CHECK#4
if (undefined > new Number(1) !== false) {
  $ERROR('#4: undefined > new Number(1) === false');
}

