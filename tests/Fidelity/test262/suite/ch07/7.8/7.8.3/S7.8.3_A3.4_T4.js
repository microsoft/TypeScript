// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: DecimalIntegerLiteral. DecimalDigigts ExponentPart
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A3.4_T4.js
 * @description ExponentPart :: E -DecimalDigits
 */

//CHECK#0
if (0.0E-1 !== 0) {
  $ERROR('#0: 0.0E-1 === 0');
}

//CHECK#1
if (1.1E-1 !== 0.11) {
  $ERROR('#1: 1.1E-1 === 0.11');
}

//CHECK#2
if (2.2E-1 !== 0.22) {
  $ERROR('#2: 2.2E-1 === 0.22');
}

//CHECK#3
if (3.3E-1 !== 0.33) {
  $ERROR('#3: 3.3E-1 === 0.33');
}

//CHECK#4
if (4.4E-1 !== 0.44) {
  $ERROR('#4: 4.4E-1 === 0.44');
}

//CHECK#5
if (5.5E-1 !== 0.55) {
  $ERROR('#5: 5.5E-1 === 0.55');
}

//CHECK#6
if (6.6E-1 !== 0.66) {
  $ERROR('#6: 6.E-1 === 0.66');
}

//CHECK#7
if (7.7E-1 !== 0.77) {
  $ERROR('#7: 7.7E-1 === 0.77');
}

//CHECK#8
if (8.8E-1 !== 0.88) {
  $ERROR('#8: 8.8E-1 === 0.88');
}

//CHECK#9
if (9.9E-1 !== 0.99) {
  $ERROR('#9: 9.9E-1 === 0.99');
}

