// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between "void" and UnaryExpression are allowed
 *
 * @path ch11/11.4/11.4.2/S11.4.2_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("void\u00090") !== undefined) {
  $ERROR('#1: void\\u00090 === undefined');
}

//CHECK#2
if (eval("void\u000B0") !== undefined) {
  $ERROR('#2: void\\u000B0 === undefined');  
}

//CHECK#3
if (eval("void\u000C0") !== undefined) {
  $ERROR('#3: void\\u000C0 === undefined');
}

//CHECK#4
if (eval("void\u00200") !== undefined) {
  $ERROR('#4: void\\u00200 === undefined');
}

//CHECK#5
if (eval("void\u00A00") !== undefined) {
  $ERROR('#5: void\\u00A00 === undefined');
}

//CHECK#6
if (eval("void\u000A0") !== undefined) {
  $ERROR('#6: void\\u000A0 === undefined');  
}

//CHECK#7
if (eval("void\u000D0") !== undefined) {
  $ERROR('#7: void\\u000D0 === undefined');
}

//CHECK#8
if (eval("void\u20280") !== undefined) {
  $ERROR('#8: void\\u20280 === undefined');
}

//CHECK#9
if (eval("void\u20290") !== undefined) {
  $ERROR('#9: void\\u20290 === undefined');
}

//CHECK#10
if (eval("void\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20290") !== undefined) {
  $ERROR('#10: void\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20290 === undefined');
}

