// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between ShiftExpression and ">>>" or between ">>>" and AdditiveExpression are allowed
 *
 * @path ch11/11.7/11.7.3/S11.7.3_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("-4\u0009>>>\u00091") !== 2147483646) {
  $ERROR('#1: -4\\u0009>>>\\u00091 === 2147483646');
}

//CHECK#2
if (eval("-4\u000B>>>\u000B1") !== 2147483646) {
  $ERROR('#2: -4\\u000B>>>\\u000B1 === 2147483646');  
}

//CHECK#3
if (eval("-4\u000C>>>\u000C1") !== 2147483646) {
  $ERROR('#3: -4\\u000C>>>\\u000C1 === 2147483646');
}

//CHECK#4
if (eval("-4\u0020>>>\u00201") !== 2147483646) {
  $ERROR('#4: -4\\u0020>>>\\u00201 === 2147483646');
}

//CHECK#5
if (eval("-4\u00A0>>>\u00A01") !== 2147483646) {
  $ERROR('#5: -4\\u00A0>>>\\u00A01 === 2147483646');
}

//CHECK#6
if (eval("-4\u000A>>>\u000A1") !== 2147483646) {
  $ERROR('#6: -4\\u000A>>>\\u000A1 === 2147483646');  
}

//CHECK#7
if (eval("-4\u000D>>>\u000D1") !== 2147483646) {
  $ERROR('#7: -4\\u000D>>>\\u000D1 === 2147483646');
}

//CHECK#8
if (eval("-4\u2028>>>\u20281") !== 2147483646) {
  $ERROR('#8: -4\\u2028>>>\\u20281 === 2147483646');
}

//CHECK#9
if (eval("-4\u2029>>>\u20291") !== 2147483646) {
  $ERROR('#9: -4\\u2029>>>\\u20291 === 2147483646');
}

//CHECK#10
if (eval("-4\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029>>>\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u20291") !== 2147483646) {
  $ERROR('#10: -4\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029>>>\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u20291 === 2147483646');
}

