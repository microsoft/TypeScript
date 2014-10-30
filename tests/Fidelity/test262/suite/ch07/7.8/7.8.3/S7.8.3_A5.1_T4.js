// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: HexIntegerLiteral
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A5.1_T4.js
 * @description HexIntegerLiteral :: 0X NonZeroDigit Digits
 */

//CHECK#0
if (0X0 !== 0) {
  $ERROR('#0: 0X0 === 0');
}

//CHECK#1
if (0X1 !== 1) {
  $ERROR('#1: 0X1 === 1');
}

//CHECK#2
if (0X10 !== 16) {
  $ERROR('#2: 0X10 === 16');
}

//CHECK3
if (0X100 !== 256) {
  $ERROR('3: 0X100 === 256');
}

//CHECK#4
if (0X1000 !== 4096) {
  $ERROR('#4: 0X1000 === 4096');
}

//CHECK#5
if (0X10000 !== 65536) {
  $ERROR('#5: 0X10000 === 65536');
}

//CHECK#6
if (0X100000 !== 1048576) {
  $ERROR('#6: 0X100000 === 1048576');
}

//CHECK#7
if (0X1000000 !== 16777216) {
  $ERROR('#7: 0X1000000 === 16777216');
}

//CHECK#8
if (0X10000000 !== 268435456) {
  $ERROR('#8: 0X10000000 === 268435456');
}

