// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between "delete" and UnaryExpression are allowed
 *
 * @path ch11/11.4/11.4.1/S11.4.1_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("delete\u00090") !== true) {
  $ERROR('#1: delete\\u00090 === true');
}

//CHECK#2
if (eval("delete\u000B0") !== true) {
  $ERROR('#2: delete\\u000B0 === true');  
}

//CHECK#3
if (eval("delete\u000C0") !== true) {
  $ERROR('#3: delete\\u000C0 === true');
}

//CHECK#4
if (eval("delete\u00200") !== true) {
  $ERROR('#4: delete\\u00200 === true');
}

//CHECK#5
if (eval("delete\u00A00") !== true) {
  $ERROR('#5: delete\\u00A00 === true');
}

//CHECK#6
if (eval("delete\u000A0") !== true) {
  $ERROR('#6: delete\\u000A0 === true');  
}

//CHECK#7
if (eval("delete\u000D0") !== true) {
  $ERROR('#7: delete\\u000D0 === true');
}

//CHECK#8
if (eval("delete\u20280") !== true) {
  $ERROR('#8: delete\\u20280 === true');
}

//CHECK#9
if (eval("delete\u20290") !== true) {
  $ERROR('#9: delete\\u20290 === true');
}

//CHECK#10
if (eval("delete\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20290") !== true) {
  $ERROR('#10: delete\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20290 === true');
}

