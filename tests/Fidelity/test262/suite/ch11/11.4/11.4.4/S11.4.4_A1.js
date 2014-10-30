// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between "++" and UnaryExpression are allowed
 *
 * @path ch11/11.4/11.4.4/S11.4.4_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("var x = 0; ++\u0009x") !== 1) {
  $ERROR('#1: var x = 0; ++\\u0009x; x === 1. Actual: ' + (x));
}

//CHECK#2
if (eval("var x = 0; ++\u000Bx") !== 1) {
  $ERROR('#2: var x = 0; ++\\u000Bx; x === 1. Actual: ' + (x));  
}

//CHECK#3
if (eval("var x = 0; ++\u000Cx") !== 1) {
  $ERROR('#3: var x = 0; ++\\u000Cx; x === 1. Actual: ' + (x));
}

//CHECK#4
if (eval("var x = 0; ++\u0020x") !== 1) {
  $ERROR('#4: var x = 0; ++\\u0020x; x === 1. Actual: ' + (x));
}

//CHECK#5
if (eval("var x = 0; ++\u00A0x") !== 1) {
  $ERROR('#5: var x = 0; ++\\u00A0x; x === 1. Actual: ' + (x));
}

//CHECK#6
if (eval("var x = 0; ++\u000Ax") !== 1) {
  $ERROR('#6: var x = 0; ++\\u000Ax; x === 1. Actual: ' + (x));  
}

//CHECK#7
if (eval("var x = 0; ++\u000Dx") !== 1) {
  $ERROR('#7: var x = 0; ++\\u000Dx; x === 1. Actual: ' + (x));
}

//CHECK#8
if (eval("var x = 0; ++\u2028x") !== 1) {
  $ERROR('#8: var x = 0; ++\\u2028x; x === 1. Actual: ' + (x));
}

//CHECK#9
if (eval("var x = 0; ++\u2029x") !== 1) {
  $ERROR('#9: var x = 0; ++\\u2029x; x === 1. Actual: ' + (x));
}

//CHECK#10
if (eval("var x = 0; ++\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029x") !== 1) {
  $ERROR('#10: var x = 0; ++\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029x; x === 1. Actual: ' + (x));
}

