// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the mathematical integer value
 * that is represented by Z in radix-R notation, using the
 * letters A-Z and a-z for digits with values 10 through 35.
 * Compute the number value for Result(16)
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A7.2_T2.js
 * @description Checking algorithm for R = 2
 */

//CHECK#1
if (parseInt("1", 2)  !== 1) {
  $ERROR('#1: parseInt("1", 2) === 1. Actual: ' + (parseInt("1", 2)));
}

//CHECK#2
if (parseInt("11", 2)  !== 3) {
  $ERROR('#2: parseInt("11", 2) === 3. Actual: ' + (parseInt("11", 2)));
}

//CHECK#3
if (parseInt("111", 2)  !== 7) {
  $ERROR('#3: parseInt("111", 2) === 7. Actual: ' + (parseInt("111", 2)));
}

//CHECK#4
if (parseInt("1111", 2)  !== 15) {
  $ERROR('#4: parseInt("1111", 2) === 15. Actual: ' + (parseInt("1111", 2)));
}

//CHECK#5
if (parseInt("11111", 2)  !== 31) {
  $ERROR('#5: parseInt("11111", 2) === 31. Actual: ' + (parseInt("11111", 2)));
}

//CHECK#6
if (parseInt("111111", 2)  !== 63) {
  $ERROR('#6: parseInt("111111", 2) === 63. Actual: ' + (parseInt("111111", 2)));
}

//CHECK#7
if (parseInt("1111111", 2)  !== 127) {
  $ERROR('#7: parseInt("1111111", 2) === 127. Actual: ' + (parseInt("1111111", 2)));
}

//CHECK#8
if (parseInt("11111111", 2)  !== 255) {
  $ERROR('#8: parseInt("11111111", 2) === 255. Actual: ' + (parseInt("11111111", 2)));
}

//CHECK#9
if (parseInt("111111111", 2)  !== 511) {
  $ERROR('#9: parseInt("111111111", 2) === 511. Actual: ' + (parseInt("111111111", 2)));
}

//CHECK#10
if (parseInt("1111111111", 2)  !== 1023) {
  $ERROR('#10: parseInt("1111111111", 2) === 1023. Actual: ' + (parseInt("1111111111", 2)));
}

//CHECK#11
if (parseInt("11111111111", 2)  !== 2047) {
  $ERROR('#11: parseInt("11111111111", 2) === 2047. Actual: ' + (parseInt("11111111111", 2)));
}

//CHECK#12
if (parseInt("111111111111", 2)  !== 4095) {
  $ERROR('#12: parseInt("111111111111", 2) === 4095. Actual: ' + (parseInt("111111111111", 2)));
}

//CHECK#13
if (parseInt("1111111111111", 2)  !== 8191) {
  $ERROR('#13: parseInt("1111111111111", 2) === 8191. Actual: ' + (parseInt("1111111111111", 2)));
}

//CHECK#14
if (parseInt("11111111111111", 2)  !== 16383) {
  $ERROR('#14: parseInt("11111111111111", 2) === 16383. Actual: ' + (parseInt("11111111111111", 2)));
}

//CHECK#15
if (parseInt("111111111111111", 2)  !== 32767) {
  $ERROR('#15: parseInt("111111111111111", 2) === 32767. Actual: ' + (parseInt("111111111111111", 2)));
}

//CHECK#16
if (parseInt("1111111111111111", 2)  !== 65535) {
  $ERROR('#16: parseInt("1111111111111111", 2) === 65535. Actual: ' + (parseInt("1111111111111111", 2)));
}

//CHECK#17
if (parseInt("11111111111111111", 2)  !== 131071) {
  $ERROR('#17: parseInt("11111111111111111", 2) === 131071. Actual: ' + (parseInt("11111111111111111", 2)));
}

//CHECK#18
if (parseInt("111111111111111111", 2)  !== 262143) {
  $ERROR('#18: parseInt("111111111111111111", 2) === 262143. Actual: ' + (parseInt("111111111111111111", 2)));
}

//CHECK#19
if (parseInt("1111111111111111111", 2)  !== 524287) {
  $ERROR('#19: parseInt("1111111111111111111", 2) === 524287. Actual: ' + (parseInt("1111111111111111111", 2)));
}

//CHECK#20
if (parseInt("11111111111111111111", 2)  !== 1048575) {
  $ERROR('#20: parseInt("11111111111111111111", 2) === 1048575. Actual: ' + (parseInt("11111111111111111111", 2)));
}

