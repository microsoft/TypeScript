// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator inside "grouping" operator are allowed
 *
 * @path ch11/11.1/11.1.6/S11.1.6_A1.js
 * @description Inserting WhiteSpaces and LineTerminators into grouping operator. Eval is used
 */

//CHECK#1
if (eval("(\u00091\u0009)") !== 1) {
  $ERROR('#1: (\\u00091\\u0009) === 1');
}

//CHECK#2
if (eval("(\u000B1\u000B)") !== 1) {
  $ERROR('#2: (\\u000B1\\u000B) === 1');  
}

//CHECK#3
if (eval("(\u000C1\u000C)") !== 1) {
  $ERROR('#3: (\\u000C1\\u000C) === 1');
}

//CHECK#4
if (eval("(\u00201\u0020)") !== 1) {
  $ERROR('#4: (\\u00201\\u0020 === 1');
}

//CHECK#5
if (eval("(\u00A01\u00A0)") !== 1) {
  $ERROR('#5: (\\u00A01\\u00A0) === 1');
}

//CHECK#6
if (eval("(\u000A1\u000A)") !== 1) {
  $ERROR('#6: (\\u000A1\\u000A) === 1');  
}

//CHECK#7
if (eval("(\u000D1\u000D)") !== 1) {
  $ERROR('#7: (\\u000D1\\u000D) === 1');
}

//CHECK#8
if (eval("(\u20281\u2028)") !== 1) {
  $ERROR('#8: (\\u20281\\u2028) === 1');
}

//CHECK#9
if (eval("(\u20291\u2029)") !== 1) {
  $ERROR('#9: (\\u20291\\u2029) === 1');
}

//CHECK#10
if (eval("(\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029)") !== 1) {
  $ERROR('#10: (\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029) === 1');
}

