// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between "typeof" and UnaryExpression are allowed
 *
 * @path ch11/11.4/11.4.3/S11.4.3_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("var x = 0; typeof\u0009x") !== "number") {
  $ERROR('#1: var x = 0; typeof\\u0009x; x === "number". Actual: ' + (x));
}

//CHECK#2
if (eval("var x = 0; typeof\u000Bx") !== "number") {
  $ERROR('#2: var x = 0; typeof\\u000Bx; x === "number". Actual: ' + (x));  
}

//CHECK#3
if (eval("var x = 0; typeof\u000Cx") !== "number") {
  $ERROR('#3: var x = 0; typeof\\u000Cx; x === "number". Actual: ' + (x));
}

//CHECK#4
if (eval("var x = 0; typeof\u0020x") !== "number") {
  $ERROR('#4: var x = 0; typeof\\u0020x; x === "number". Actual: ' + (x));
}

//CHECK#5
if (eval("var x = 0; typeof\u00A0x") !== "number") {
  $ERROR('#5: var x = 0; typeof\\u00A0x; x === "number". Actual: ' + (x));
}

//CHECK#6
if (eval("var x = 0; typeof\u000Ax") !== "number") {
  $ERROR('#6: var x = 0; typeof\\u000Ax; x === "number". Actual: ' + (x));  
}

//CHECK#7
if (eval("var x = 0; typeof\u000Dx") !== "number") {
  $ERROR('#7: var x = 0; typeof\\u000Dx; x === "number". Actual: ' + (x));
}

//CHECK#8
if (eval("var x = 0; typeof\u2028x") !== "number") {
  $ERROR('#8: var x = 0; typeof\\u2028x; x === "number". Actual: ' + (x));
}

//CHECK#9
if (eval("var x = 0; typeof\u2029x") !== "number") {
  $ERROR('#9: var x = 0; typeof\\u2029x; x === "number". Actual: ' + (x));
}

//CHECK#10
if (eval("var x = 0; typeof\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029x") !== "number") {
  $ERROR('#10: var x = 0; typeof\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029x; x === "number". Actual: ' + (x));
}

