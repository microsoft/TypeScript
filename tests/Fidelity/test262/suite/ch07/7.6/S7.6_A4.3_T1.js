// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Correct interpretation of DIGITS
 *
 * @path ch07/7.6/S7.6_A4.3_T1.js
 * @description Identifier is $+ANY_DIGIT
 */

//CHECK#0-9
var $\u0030 = 0;
if ($0 !== 0) {
  $ERROR('#0: $\\u0030 = 0; $0 === 0');
}
var $\u0031 = 1;
if ($1 !== 1) {
  $ERROR('#1: $\\u0031 = 1; $1 === 1');
}
var $\u0032 = 2;
if ($2 !== 2) {
  $ERROR('#2: $\\u0032 = 2; $2 === 2');
}
var $\u0033 = 3;
if ($3 !== 3) {
  $ERROR('#3: $\\u0033 = 3; $3 === 3');
}
var $\u0034 = 4;
if ($4 !== 4) {
  $ERROR('#4: $\\u0034 = 4; $4 === 4');
}
var $\u0035 = 5;
if ($5 !== 5) {
  $ERROR('#5: $\\u0035 = 5; $5 === 5');
}
var $\u0036 = 6;
if ($6 !== 6) {
  $ERROR('#6: $\\u0036 = 6; $6 === 6');
}
var $\u0037 = 7;
if ($7 !== 7) {
  $ERROR('#7: $\\u0037 = 7; $7 === 7');
}
var $\u0038 = 8;
if ($8 !== 8) {
  $ERROR('#8: $\\u0038 = 8; $8 === 8');
}
var $\u0039 = 9;
if ($9 !== 9) {
  $ERROR('#9: $\\u0039 = 9; $9 === 9');
}

