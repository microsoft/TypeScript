// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: DecimalIntegerLiteral. DecimalDigigts ExponentPart
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A3.4_T1.js
 * @description ExponentPart :: e DecimalDigits
 */

//CHECK#0
if (0.0e1 !== 0) {
  $ERROR('#0: 0.0e1 === 0');
}

//CHECK#1
if (1.1e1 !== 11) {
  $ERROR('#1: 1.1e1 === 11');
}

//CHECK#2
if (2.2e1 !== 22) {
  $ERROR('#2: 2.2e1 === 22');
}

//CHECK#3
if (3.3e1 !== 33) {
  $ERROR('#3: 3.3e1 === 33');
}

//CHECK#4
if (4.4e1 !== 44) {
  $ERROR('#4: 4.4e1 === 44');
}

//CHECK#5
if (5.5e1 !== 55) {
  $ERROR('#5: 5.5e1 === 55');
}

//CHECK#6
if (6.6e1 !== 66) {
  $ERROR('#6: 6.e1 === 66');
}

//CHECK#7
if (7.7e1 !== 77) {
  $ERROR('#7: 7.7e1 === 77');
}

//CHECK#8
if (8.8e1 !== 88) {
  $ERROR('#8: 8.8e1 === 88');
}

//CHECK#9
if (9.9e1 !== 99) {
  $ERROR('#9: 9.9e1 === 99');
}

