// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between EqualityExpression and "==" or between "==" and RelationalExpression are allowed
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("true\u0009==\u00091") !== true) {
  $ERROR('#1: (true\\u0009==\\u00091) === true');
}

//CHECK#2
if (eval("true\u000B==\u000B1") !== true) {
  $ERROR('#2: (true\\u000B==\\u000B1) === true');  
}

//CHECK#3
if (eval("true\u000C==\u000C1") !== true) {
  $ERROR('#3: (true\\u000C==\\u000C1) === true');
}

//CHECK#4
if (eval("true\u0020==\u00201") !== true) {
  $ERROR('#4: (true\\u0020==\\u00201) === true');
}

//CHECK#5
if (eval("true\u00A0==\u00A01") !== true) {
  $ERROR('#5: (true\\u00A0==\\u00A01) === true');
}

//CHECK#6
if (eval("true\u000A==\u000A1") !== true) {
  $ERROR('#6: (true\\u000A==\\u000A1) === true');  
}

//CHECK#7
if (eval("true\u000D==\u000D1") !== true) {
  $ERROR('#7: (true\\u000D==\\u000D1) === true');
}

//CHECK#8
if (eval("true\u2028==\u20281") !== true) {
  $ERROR('#8: (true\\u2028==\\u20281) === true');
}

//CHECK#9
if (eval("true\u2029==\u20291") !== true) {
  $ERROR('#9: (true\\u2029==\\u20291) === true');
}

//CHECK#10
if (eval("true\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029==\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291") !== true) {
  $ERROR('#10: (true\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029==\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291) === true');
}

