// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If S contains any character that is not a radix-R digit,
 * then let Z be the substring of S consisting of all characters before
 * the first such character; otherwise, let Z be S
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A6.1_T6.js
 * @description Complex test. Radix-R notation in [0..9]
 */

//CHECK#2
if (parseInt("0123456789", 2) !== 1) {
  $ERROR('#2: parseInt("0123456789", 2) === 1. Actual: ' + (parseInt("0123456789", 2)));
}  

//CHECK#3
if (parseInt("01234567890", 3) !== 5) {
  $ERROR('#3: parseInt("01234567890", 3) === 5. Actual: ' + (parseInt("01234567890", 3)));
} 

//CHECK#4
if (parseInt("01234567890", 4) !== 27) {
  $ERROR('#4: parseInt("01234567890", 4) === 27. Actual: ' + (parseInt("01234567890", 4)));
} 

//CHECK#5
if (parseInt("01234567890", 5) !== 194) {
  $ERROR('#5: parseInt("01234567890", 5) === 194. Actual: ' + (parseInt("01234567890", 5)));
}  

//CHECK#6
if (parseInt("01234567890", 6) !== 1865) {
  $ERROR('#6: parseInt("01234567890", 6) === 1865. Actual: ' + (parseInt("01234567890", 6)));
}  

//CHECK#7
if (parseInt("01234567890", 7) !== 22875) {
  $ERROR('#7: parseInt("01234567890", 7) === 22875. Actual: ' + (parseInt("01234567890", 7)));
}  

//CHECK#8
if (parseInt("01234567890", 8) !== 342391) {
  $ERROR('#8: parseInt("01234567890", 8) === 342391. Actual: ' + (parseInt("01234567890", 8)));
}  

//CHECK#9
if (parseInt("01234567890", 9) !== 6053444) {
  $ERROR('#9: parseInt("01234567890", 9) === 6053444. Actual: ' + (parseInt("01234567890", 9)));
}  

//CHECK#10
if (parseInt("01234567890", 10) !== Number(1234567890)) {
  $ERROR('#10: parseInt("01234567890", 10) === Number(1234567890). Actual: ' + (parseInt("01234567890", 10)));
}  

