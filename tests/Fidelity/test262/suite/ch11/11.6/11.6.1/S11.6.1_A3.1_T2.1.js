// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(Primitive(x)) is not String and Type(Primitive(y)) is not String, then operator x + y returns ToNumber(x) + ToNumber(y)
 *
 * @path ch11/11.6/11.6.1/S11.6.1_A3.1_T2.1.js
 * @description Type(Primitive(x)) is different from Type(Primitive(y)) and both types vary between Number (primitive or object) or Boolean (primitive and object)
 */

//CHECK#1
if (true + 1 !== 2) {
  $ERROR('#1: true + 1 === 2. Actual: ' + (true + 1));
}

//CHECK#2
if (1 + true !== 2) {
  $ERROR('#2: 1 + true === 2. Actual: ' + (1 + true));
}

//CHECK#3
if (new Boolean(true) + 1 !== 2) {
  $ERROR('#3: new Boolean(true) + 1 === 2. Actual: ' + (new Boolean(true) + 1));
}

//CHECK#4
if (1 + new Boolean(true) !== 2) {
  $ERROR('#4: 1 + new Boolean(true) === 2. Actual: ' + (1 + new Boolean(true)));
}

//CHECK#5
if (true + new Number(1) !== 2) {
  $ERROR('#5: true + new Number(1) === 2. Actual: ' + (true + new Number(1)));
}

//CHECK#6
if (new Number(1) + true !== 2) {
  $ERROR('#6: new Number(1) + true === 2. Actual: ' + (new Number(1) + true));
}

//CHECK#7
if (new Boolean(true) + new Number(1) !== 2) {
  $ERROR('#7: new Boolean(true) + new Number(1) === 2. Actual: ' + (new Boolean(true) + new Number(1)));
}

//CHECK#8
if (new Number(1) + new Boolean(true) !== 2) {
  $ERROR('#8: new Number(1) + new Boolean(true) === 2. Actual: ' + (new Number(1) + new Boolean(true)));
}

