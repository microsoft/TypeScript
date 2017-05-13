// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between LogicalORExpression and "?" or between "?" and AssignmentExpression or between AssignmentExpression and ":" or between ":" and AssignmentExpression are allowed
 *
 * @path ch11/11.12/S11.12_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if ((eval("false\u0009?\u0009true\u0009:\u0009true")) !== true) {
  $ERROR('#1: (false\\u0009?\\u0009true\\u0009:\\u0009true) === true');
}

//CHECK#2
if ((eval("false\u000B?\u000Btrue\u000B:\u000Btrue")) !== true) {
  $ERROR('#2: (false\\u000B?\\u000Btrue\\u000B:\\u000Btrue) === true');
}

//CHECK#3
if ((eval("false\u000C?\u000Ctrue\u000C:\u000Ctrue")) !== true) {
  $ERROR('#3: (false\\u000C?\\u000Ctrue\\u000C:\\u000Ctrue) === true');
}

//CHECK#4
if ((eval("false\u0020?\u0020true\u0020:\u0020true")) !== true) {
  $ERROR('#4: (false\\u0020?\\u0020true\\u0020:\\u0020true) === true');
}

//CHECK#5
if ((eval("false\u00A0?\u00A0true\u00A0:\u00A0true")) !== true) {
  $ERROR('#5: (false\\u00A0?\\u00A0true\\u00A0:\\u00A0true) === true');
}

//CHECK#6
if ((eval("false\u000A?\u000Atrue\u000A:\u000Atrue")) !== true) {
  $ERROR('#6: (false\\u000A?\\u000Atrue\\u000A:\\u000Atrue) === true');
}

//CHECK#7
if ((eval("false\u000D?\u000Dtrue\u000D:\u000Dtrue")) !== true) {
  $ERROR('#7: (false\\u000D?\\u000Dtrue\\u000D:\\u000Dtrue) === true');
}

//CHECK#8
if ((eval("false\u2028?\u2028true\u2028:\u2028true")) !== true) {
  $ERROR('#8: (false\\u2028?\\u2028true\\u2028:\\u2028true) === true');
}

//CHECK#9
if ((eval("false\u2029?\u2029true\u2029:\u2029true")) !== true) {
  $ERROR('#9: (false\\u2029?\\u2029true\\u2029:\\u2029true) === true');
}

//CHECK#10
if ((eval("false\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029?\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029:\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true")) !== true) {
  $ERROR('#10: (false\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029?\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029:\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true) === true');
}

