// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A4.2_T8.js
 * @description ExponentIndicator :: E
 */

//CHECK#0
if (0E00 !== 0) {
  $ERROR('#0: 0E00 === 0');
}

//CHECK#1
if (1E00 !== 1) {
  $ERROR('#1: 1E00 === 1');
}

//CHECK#2
if (2E00 !== 2) {
  $ERROR('#2: 2E00 === 2');
}

//CHECK#3
if (3E00 !== 3) {
  $ERROR('#3: 3E00 === 3');
}

//CHECK#4
if (4E00 !== 4) {
  $ERROR('#4: 4E00 === 4');
}

//CHECK#5
if (5E00 !== 5) {
  $ERROR('#5: 5E00 === 5');
}

//CHECK#6
if (6E00 !== 6) {
  $ERROR('#6: 6E00 === 6');
}

//CHECK#7
if (7E00 !== 7) {
  $ERROR('#7: 7E00 === 7');
}

//CHECK#8
if (8E00 !== 8) {
  $ERROR('#8: 8E00 === 8');
}

//CHECK#9
if (9E00 !== 9) {
  $ERROR('#9: 9E00 === 9');
}

