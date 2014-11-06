// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A4.2_T7.js
 * @description ExponentIndicator :: e
 */

//CHECK#0
if (0e00 !== 0) {
  $ERROR('#0: 0e00 === 0');
}

//CHECK#1
if (1e00 !== 1) {
  $ERROR('#1: 1e00 === 1');
}

//CHECK#2
if (2e00 !== 2) {
  $ERROR('#2: 2e00 === 2');
}

//CHECK#3
if (3e00 !== 3) {
  $ERROR('#3: 3e00 === 3');
}

//CHECK#4
if (4e00 !== 4) {
  $ERROR('#4: 4e00 === 4');
}

//CHECK#5
if (5e00 !== 5) {
  $ERROR('#5: 5e00 === 5');
}

//CHECK#6
if (6e00 !== 6) {
  $ERROR('#6: 6e00 === 6');
}

//CHECK#7
if (7e00 !== 7) {
  $ERROR('#7: 7e00 === 7');
}

//CHECK#8
if (8e00 !== 8) {
  $ERROR('#8: 8e00 === 8');
}

//CHECK#9
if (9e00 !== 9) {
  $ERROR('#9: 9e00 === 9');
}

