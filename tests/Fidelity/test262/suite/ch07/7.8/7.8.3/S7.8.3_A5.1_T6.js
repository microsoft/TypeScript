// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: HexIntegerLiteral
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A5.1_T6.js
 * @description HexIntegerLiteral :: 0X0 Digits
 */

//CHECK#0
if (0X00 !== 0) {
  $ERROR('#0: 0X00 === 0');
}

//CHECK#1
if (0X01 !== 1) {
  $ERROR('#1: 0X01 === 1');
}

//CHECK#2
if (0X010 !== 16) {
  $ERROR('#2: 0X010 === 16');
}

//CHECK3
if (0X0100 !== 256) {
  $ERROR('3: 0X0100 === 256');
}

//CHECK#4
if (0X01000 !== 4096) {
  $ERROR('#4: 0X01000 === 4096');
}

//CHECK#5
if (0X010000 !== 65536) {
  $ERROR('#5: 0X010000 === 65536');
}

//CHECK#6
if (0X0100000 !== 1048576) {
  $ERROR('#6: 0X0100000 === 1048576');
}

//CHECK#7
if (0X01000000 !== 16777216) {
  $ERROR('#7: 0X01000000 === 16777216');
}

//CHECK#8
if (0X010000000 !== 268435456) {
  $ERROR('#8: 0X010000000 === 268435456');
}

