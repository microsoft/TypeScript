// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between RelationalExpression and "in" and between "in" and ShiftExpression are allowed
 *
 * @path ch11/11.8/11.8.7/S11.8.7_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("'MAX_VALUE'\u0009in\u0009Number") !== true) {
  $ERROR('#1: "MAX_VALUE"\\u0009in\\u0009Number === true');
}

//CHECK#2
if (eval("'MAX_VALUE'\u000Bin\u000BNumber") !== true) {
  $ERROR('#2: "MAX_VALUE"\\u000Bin\\u000BNumber === true');  
}

//CHECK#3
if (eval("'MAX_VALUE'\u000Cin\u000CNumber") !== true) {
  $ERROR('#3: "MAX_VALUE"\\u000Cin\\u000CNumber === true');
}

//CHECK#4
if (eval("'MAX_VALUE'\u0020in\u0020Number") !== true) {
  $ERROR('#4: "MAX_VALUE"\\u0020in\\u0020Number === true');
}

//CHECK#5
if (eval("'MAX_VALUE'\u00A0in\u00A0Number") !== true) {
  $ERROR('#5: "MAX_VALUE"\\u00A0in\\u00A0Number === true');
}

//CHECK#6
if (eval("'MAX_VALUE'\u000Ain\u000ANumber") !== true) {
  $ERROR('#6: "MAX_VALUE"\\u000Ain\\u000ANumber === true');  
}

//CHECK#7
if (eval("'MAX_VALUE'\u000Din\u000DNumber") !== true) {
  $ERROR('#7: "MAX_VALUE"\\u000Din\\u000DNumber === true');
}

//CHECK#8
if (eval("'MAX_VALUE'\u2028in\u2028Number") !== true) {
  $ERROR('#8: "MAX_VALUE"\\u2028in\\u2028Number === true');
}

//CHECK#9
if (eval("'MAX_VALUE'\u2029in\u2029Number") !== true) {
  $ERROR('#9: "MAX_VALUE"\\u2029in\\u2029Number === true');
}

//CHECK#10
if (eval("'MAX_VALUE'\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029in\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029Number") !== true) {
  $ERROR('#10: "MAX_VALUE"\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029in\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029Number === true');
}

