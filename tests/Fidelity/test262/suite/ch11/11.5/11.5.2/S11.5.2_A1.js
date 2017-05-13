// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between MultiplicativeExpression and "/" or between "/" and UnaryExpression are allowed
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("1\u0009/\u00091") !== 1) {
  $ERROR('#1: 1\\u0009/\\u00091 === 1');
}

//CHECK#2
if (eval("1\u000B/\u000B1") !== 1) {
  $ERROR('#2: 1\\u000B/\\u000B1 === 1');  
}

//CHECK#3
if (eval("1\u000C/\u000C1") !== 1) {
  $ERROR('#3: 1\\u000C/\\u000C1 === 1');
}

//CHECK#4
if (eval("1\u0020/\u00201") !== 1) {
  $ERROR('#4: 1\\u0020/\\u00201 === 1');
}

//CHECK#5
if (eval("1\u00A0/\u00A01") !== 1) {
  $ERROR('#5: 1\\u00A0/\\u00A01 === 1');
}

//CHECK#6
if (eval("1\u000A/\u000A1") !== 1) {
  $ERROR('#6: 1\\u000A/\\u000A1 === 1');  
}

//CHECK#7
if (eval("1\u000D/\u000D1") !== 1) {
  $ERROR('#7: 1\\u000D/\\u000D1 === 1');
}

//CHECK#8
if (eval("1\u2028/\u20281") !== 1) {
  $ERROR('#8: 1\\u2028/\\u20281 === 1');
}

//CHECK#9
if (eval("1\u2029/\u20291") !== 1) {
  $ERROR('#9: 1\\u2029/\\u20291 === 1');
}

//CHECK#10
if (eval("1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029/\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291") !== 1) {
  $ERROR('#10: 1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029/\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291 === 1');
}

