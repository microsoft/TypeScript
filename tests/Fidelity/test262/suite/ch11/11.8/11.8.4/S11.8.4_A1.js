// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between RelationalExpression and "=>" or "=>" and ShiftExpression are allowed
 *
 * @path ch11/11.8/11.8.4/S11.8.4_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("1\u0009>=\u00091") !== true) {
  $ERROR('#1: (1\\u0009>=\\u00091) === true');
}

//CHECK#2
if (eval("1\u000B>=\u000B1") !== true) {
  $ERROR('#2: (1\\u000B>=\\u000B1) === true');  
}

//CHECK#3
if (eval("1\u000C>=\u000C1") !== true) {
  $ERROR('#3: (1\\u000C>=\\u000C1) === true');
}

//CHECK#4
if (eval("1\u0020>=\u00201") !== true) {
  $ERROR('#4: (1\\u0020>=\\u00201) === true');
}

//CHECK#5
if (eval("1\u00A0>=\u00A01") !== true) {
  $ERROR('#5: (1\\u00A0>=\\u00A01) === true');
}

//CHECK#6
if (eval("1\u000A>=\u000A1") !== true) {
  $ERROR('#6: (1\\u000A>=\\u000A1) === true');  
}

//CHECK#7
if (eval("1\u000D>=\u000D1") !== true) {
  $ERROR('#7: (1\\u000D>=\\u000D1) === true');
}

//CHECK#8
if (eval("1\u2028>=\u20281") !== true) {
  $ERROR('#8: (1\\u2028>=\\u20281) === true');
}

//CHECK#9
if (eval("1\u2029>=\u20291") !== true) {
  $ERROR('#9: (1\\u2029>=\\u20291) === true');
}

//CHECK#10
if (eval("1\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291") !== true) {
  $ERROR('#10: (1\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029>=\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === true');
}

