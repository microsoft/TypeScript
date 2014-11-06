// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A4.2_T1.js
 * @description ExponentIndicator :: e
 */

//CHECK#0
if (0e01 !== 0) {
  $ERROR('#0: 0e01 === 0');
}

//CHECK#1
if (1e01 !== 10) {
  $ERROR('#1: 1e01 === 10');
}

//CHECK#2
if (2e01 !== 20) {
  $ERROR('#2: 2e01 === 20');
}

//CHECK#3
if (3e01 !== 30) {
  $ERROR('#3: 3e01 === 30');
}

//CHECK#4
if (4e01 !== 40) {
  $ERROR('#4: 4e01 === 40');
}

//CHECK#5
if (5e01 !== 50) {
  $ERROR('#5: 5e01 === 50');
}

//CHECK#6
if (6e01 !== 60) {
  $ERROR('#6: 6e01 === 60');
}

//CHECK#7
if (7e01 !== 70) {
  $ERROR('#7: 7e01 === 70');
}

//CHECK#8
if (8e01 !== 80) {
  $ERROR('#8: 8e01 === 80');
}

//CHECK#9
if (9e01 !== 90) {
  $ERROR('#9: 9e01 === 90');
}

