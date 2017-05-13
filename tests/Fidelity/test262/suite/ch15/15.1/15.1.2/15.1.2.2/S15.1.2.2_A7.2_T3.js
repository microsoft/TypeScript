// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the mathematical integer value
 * that is represented by Z in radix-R notation, using the
 * letters A-Z and a-z for digits with values 10 through 35.
 * Compute the number value for Result(16)
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A7.2_T3.js
 * @description Checking algorithm for R = 16
 */

//CHECK#1
if (parseInt("0x1", 16) !== 1) {
  $ERROR('#1: parseInt("0x1", 16) === 1. Actual: ' + (parseInt("0x1", 16)));
}

//CHECK#2
if (parseInt("0X10", 16) !== 16) {
  $ERROR('#2: parseInt("0X10", 16) === 16. Actual: ' + (parseInt("0X10", 16)));
}

//CHECK#3
if (parseInt("0x100", 16) !== 256) {
  $ERROR('#3: parseInt("0x100", 16) === 256. Actual: ' + (parseInt("0x100", 16)));
}

//CHECK#4
if (parseInt("0X1000", 16) !== 4096) {
  $ERROR('#4: parseInt("0X1000", 16) === 4096. Actual: ' + (parseInt("0X1000", 16)));
}

//CHECK#5
if (parseInt("0x10000", 16) !== 65536) {
  $ERROR('#5: parseInt("0x10000", 16) === 65536. Actual: ' + (parseInt("0x10000", 16)));
}

//CHECK#6
if (parseInt("0X100000", 16) !== 1048576) {
  $ERROR('#6: parseInt("x100000", 16) === 1048576. Actual: ' + (parseInt("x100000", 16)));
}

//CHECK#7
if (parseInt("0x1000000", 16) !== 16777216) {
  $ERROR('#7: parseInt("0x1000000", 16) === 16777216. Actual: ' + (parseInt("0x1000000", 16)));
}

//CHECK#8
if (parseInt("0x10000000", 16) !== 268435456) {
  $ERROR('#8: parseInt("0x10000000", 16) === 268435456. Actual: ' + (parseInt("0x10000000", 16)));
}

//CHECK#9
if (parseInt("0x100000000", 16) !== 4294967296) {
  $ERROR('#9: parseInt("0x100000000", 16) === 4294967296. Actual: ' + (parseInt("0x100000000", 16)));
}

//CHECK#10
if (parseInt("0x1000000000", 16) !== 68719476736) {
  $ERROR('#10: parseInt("0x1000000000", 16) === 68719476736. Actual: ' + (parseInt("0x1000000000", 16)));
}

//CHECK#10
if (parseInt("0x10000000000", 16) !== 1099511627776) {
  $ERROR('#10: parseInt("0x10000000000", 16) === 1099511627776. Actual: ' + (parseInt("0x10000000000", 16)));
}

//CHECK#12
if (parseInt("0x100000000000", 16) !== 17592186044416) {
  $ERROR('#12: parseInt("0x100000000000", 16) === 17592186044416. Actual: ' + (parseInt("0x100000000000", 16)));
}

//CHECK#13
if (parseInt("0x1000000000000", 16) !== 281474976710656) {
  $ERROR('#13: parseInt("0x1000000000000", 16) === 281474976710656. Actual: ' + (parseInt("0x1000000000000", 16)));
}

//CHECK#14
if (parseInt("0x10000000000000", 16) !== 4503599627370496) {
  $ERROR('#14: parseInt("0x10000000000000", 16) === 4503599627370496. Actual: ' + (parseInt("0x10000000000000", 16)));
}

//CHECK#15
if (parseInt("0x100000000000000", 16) !== 72057594037927936) {
  $ERROR('#15: parseInt("0x100000000000000", 16) === 72057594037927936. Actual: ' + (parseInt("0x100000000000000", 16)));
}

//CHECK#16
if (parseInt("0x1000000000000000", 16) !== 1152921504606846976) {
  $ERROR('#16: parseInt("0x1000000000000000", 16) === 1152921504606846976. Actual: ' + (parseInt("0x1000000000000000", 16)));
}

//CHECK#17
if (parseInt("0x10000000000000000", 16) !== 18446744073709551616) {
  $ERROR('#17: parseInt("0x10000000000000000", 16) === 18446744073709551616. Actual: ' + (parseInt("0x10000000000000000", 16)));
}

//CHECK#18
if (parseInt("0x100000000000000000", 16) !== 295147905179352825856) {
  $ERROR('#18: parseInt("0x100000000000000000", 16) === 295147905179352825856. Actual: ' + (parseInt("0x100000000000000000", 16)));
}

//CHECK#19
if (parseInt("0x1000000000000000000", 16) !== 4722366482869645213696) {
  $ERROR('#19: parseInt("0x1000000000000000000", 16) === 4722366482869645213696. Actual: ' + (parseInt("0x1000000000000000000", 16)));
}

//CHECK#20
if (parseInt("0x10000000000000000000", 16) !== 75557863725914323419136) {
  $ERROR('#20: parseInt("0x10000000000000000000", 16) === 75557863725914323419136. Actual: ' + (parseInt("0x10000000000000000000", 16)));
}

