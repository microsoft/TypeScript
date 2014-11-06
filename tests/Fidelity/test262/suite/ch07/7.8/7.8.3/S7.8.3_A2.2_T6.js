// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: .DecimalDigits ExponentPart
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A2.2_T6.js
 * @description ExponentPart :: E +DecimalDigits
 */

//CHECK#0
if (.0E+1 !== 0) {
  $ERROR('#0: .0E+1 === 0');
}

//CHECK#1
if (.1E+1 !== 1) {
  $ERROR('#1: .1E+1 === 1');
}

//CHECK#2
if (.2E+1 !== 2) {
  $ERROR('#2: .2E+1 === 2');
}

//CHECK#3
if (.3E+1 !== 3) {
  $ERROR('#3: .3E+1 === 3');
}

//CHECK#4
if (.4E+1 !== 4) {
  $ERROR('#4: .4E+1 === 4');
}

//CHECK#5
if (.5E+1 !== 5) {
  $ERROR('#5: .5E+1 === 5');
}

//CHECK#6
if (.6E+1 !== 6) {
  $ERROR('#6: .6E+1 === 6');
}

//CHECK#7
if (.7E+1 !== 7) {
  $ERROR('#7: .7E+1 === 7');
}

//CHECK#8
if (.8E+1 !== 8) {
  $ERROR('#8: .8E+1 === 8');
}

//CHECK#9
if (.9E+1 !== 9) {
  $ERROR('#9: .9E+1 === 9');
}

