// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: DecimalIntegerLiteral ExponentPart
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A1.2_T1.js
 * @description ExponentPart :: e DecimalDigits
 */

//CHECK#0
if (0e1 !== 0) {
  $ERROR('#0: 0e1 === 0');
}

//CHECK#1
if (1e1 !== 10) {
  $ERROR('#1: 1e1 === 10');
}

//CHECK#2
if (2e1 !== 20) {
  $ERROR('#2: 2e1 === 20');
}

//CHECK#3
if (3e1 !== 30) {
  $ERROR('#3: 3e1 === 30');
}

//CHECK#4
if (4e1 !== 40) {
  $ERROR('#4: 4e1 === 40');
}

//CHECK#5
if (5e1 !== 50) {
  $ERROR('#5: 5e1 === 50');
}

//CHECK#6
if (6e1 !== 60) {
  $ERROR('#6: 6e1 === 60');
}

//CHECK#7
if (7e1 !== 70) {
  $ERROR('#7: 7e1 === 70');
}

//CHECK#8
if (8e1 !== 80) {
  $ERROR('#8: 8e1 === 80');
}

//CHECK#9
if (9e1 !== 90) {
  $ERROR('#9: 9e1 === 90');
}

