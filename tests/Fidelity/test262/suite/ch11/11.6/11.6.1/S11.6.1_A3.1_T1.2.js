// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(Primitive(x)) is not String and Type(Primitive(y)) is not String, then operator x + y returns ToNumber(x) + ToNumber(y)
 *
 * @path ch11/11.6/11.6.1/S11.6.1_A3.1_T1.2.js
 * @description Type(Primitive(x)) and Type(Primitive(y)) vary between primitive number and Number object
 */

//CHECK#1
if (1 + 1 !== 2) {
  $ERROR('#1: 1 + 1 === 2. Actual: ' + (1 + 1));
}

//CHECK#2
if (new Number(1) + 1 !== 2) {
  $ERROR('#2: new Number(1) + 1 === 2. Actual: ' + (new Number(1) + 1));
}

//CHECK#3
if (1 + new Number(1) !== 2) {
  $ERROR('#3: 1 + new Number(1) === 2. Actual: ' + (1 + new Number(1)));
}

//CHECK#4
if (new Number(1) + new Number(1) !== 2) {
  $ERROR('#4: new Number(1) + new Number(1) === 2. Actual: ' + (new Number(1) + new Number(1)));
}


