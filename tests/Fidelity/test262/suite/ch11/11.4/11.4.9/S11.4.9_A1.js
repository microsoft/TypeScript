// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * White Space and Line Terminator between "!" and UnaryExpression are allowed
 *
 * @path ch11/11.4/11.4.9/S11.4.9_A1.js
 * @description Checking by using eval
 */

//CHECK#1
if (eval("!\u0009true") !== false) {
  $ERROR('#true: !\\u0009true === false');
}

//CHECK#2
if (eval("!\u000Btrue") !== false) {
  $ERROR('#2: !\\u000Btrue === false');  
}

//CHECK#3
if (eval("!\u000Ctrue") !== false) {
  $ERROR('#3: !\\u000Ctrue === false');
}

//CHECK#4
if (eval("!\u0020true") !== false) {
  $ERROR('#4: !\\u0020 === false');
}

//CHECK#5
if (eval("!\u00A0true") !== false) {
  $ERROR('#5: !\\u00A0true === false');
}

//CHECK#6
if (eval("!\u000Atrue") !== false) {
  $ERROR('#6: !\\u000Atrue === false');  
}

//CHECK#7
if (eval("!\u000Dtrue") !== false) {
  $ERROR('#7: !\\u000Dtrue === false');
}

//CHECK#8
if (eval("!\u2028true") !== false) {
  $ERROR('#8: !\\u2028true === false');
}

//CHECK#9
if (eval("!\u2029true") !== false) {
  $ERROR('#9: !\\u2029true === false');
}

//CHECK#10
if (eval("!\u0009\u000B\u000C\u0020\u00A0\u000A\u000D\u2028\u2029true") !== false) {
  $ERROR('#10: !\\u0009\\u000B\\u000C\\u0020\\u00A0\\u000A\\u000D\\u2028\\u2029true === false');
}

