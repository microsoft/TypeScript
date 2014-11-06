// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ExponentPart :: ExponentIndicator ( /+/-) 0 DecimalDigits is allowed
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A4.2_T3.js
 * @description ExponentIndicator :: e
 */

//CHECK#0
if (0e-01 !== 0) {
  $ERROR('#0: 0e-01 === 0');
}

//CHECK#1
if (1e-01 !== 0.1) {
  $ERROR('#1: 1e-01 === 0.1');
}

//CHECK#2
if (2e-01 !== 0.2) {
  $ERROR('#2: 2e-01 === 0.2');
}

//CHECK#3
if (3e-01 !== 0.3) {
  $ERROR('#3: 3e-01 === 0.3');
}

//CHECK#4
if (4e-01 !== 0.4) {
  $ERROR('#4: 4e-01 === 0.4');
}

//CHECK#5
if (5e-01 !== 0.5) {
  $ERROR('#5: 5e-01 === 0.5');
}

//CHECK#6
if (6e-01 !== 0.6) {
  $ERROR('#6: 6e-01 === 0.6');
}

//CHECK#7
if (7e-01 !== 0.7) {
  $ERROR('#7: 7e-01 === 0.7');
}

//CHECK#8
if (8e-01 !== 0.8) {
  $ERROR('#8: 8e-01 === 0.8');
}

//CHECK#9
if (9e-01 !== 0.9) {
  $ERROR('#9: 9e-01 === 0.9');
}

