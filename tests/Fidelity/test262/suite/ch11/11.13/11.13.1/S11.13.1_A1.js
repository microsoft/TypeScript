// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between LeftHandSideExpression and "=" or between "=" and AssignmentExpression are allowed
 *
 * @path ch11/11.13/11.13.1/S11.13.1_A1.js
 * @description Checking by using eval
 * @noStrict
 */

//CHECK#1
if ((eval("x\u0009=\u0009true")) !== true) {
  $ERROR('#1: (x\\u0009=\\u0009true) === true');
}

//CHECK#2
if ((eval("x\u000B=\u000Btrue")) !== true) {
  $ERROR('#2: (x\\u000B=\\u000Btrue) === true');
}

//CHECK#3
if ((eval("x\u000C=\u000Ctrue")) !== true) {
  $ERROR('#3: (x\\u000C=\\u000Ctrue) === true');
}

//CHECK#4
if ((eval("x\u0020=\u0020true")) !== true) {
  $ERROR('#4: (x\\u0020=\\u0020true) === true');
}

//CHECK#5
if ((eval("x\u00A0=\u00A0true")) !== true) {
  $ERROR('#5: (x\\u00A0=\\u00A0true) === true');
}

//CHECK#6
if ((eval("x\u000A=\u000Atrue")) !== true) {
  $ERROR('#6: (x\\u000A=\\u000Atrue) === true');
}

//CHECK#7
if ((eval("x\u000D=\u000Dtrue")) !== true) {
  $ERROR('#7: (x\\u000D=\\u000Dtrue) === true');
}

//CHECK#8
if ((eval("x\u2028=\u2028true")) !== true) {
  $ERROR('#8: (x\\u2028=\\u2028true) === true');
}

//CHECK#9
if ((eval("x\u2029=\u2029true")) !== true) {
  $ERROR('#9: (x\\u2029=\\u2029true) === true');
}


//CHECK#10
if ((eval("x\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029=\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true")) !== true) {
  $ERROR('#10: (x\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029=\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true) === true');
}

