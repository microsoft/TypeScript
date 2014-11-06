// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A4.2_T6.js
 * @description ExponentIndicator :: E
 */

//CHECK#0
if (0E+01 !== 0) {
  $ERROR('#0: 0E+01 === 0');
}

//CHECK#1
if (1E+01 !== 10) {
  $ERROR('#1: 1E+01 === 10');
}

//CHECK#2
if (2E+01 !== 20) {
  $ERROR('#2: 2E+01 === 20');
}

//CHECK#3
if (3E+01 !== 30) {
  $ERROR('#3: 3E+01 === 30');
}

//CHECK#4
if (4E+01 !== 40) {
  $ERROR('#4: 4E+01 === 40');
}

//CHECK#5
if (5E+01 !== 50) {
  $ERROR('#5: 5E+01 === 50');
}

//CHECK#6
if (6E+01 !== 60) {
  $ERROR('#6: 6E+01 === 60');
}

//CHECK#7
if (7E+01 !== 70) {
  $ERROR('#7: 7E+01 === 70');
}

//CHECK#8
if (8E+01 !== 80) {
  $ERROR('#8: 8E+01 === 80');
}

//CHECK#9
if (9E+01 !== 90) {
  $ERROR('#9: 9E+01 === 90');
}

