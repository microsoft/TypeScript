// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigit ::: 0 or of HexDigit ::: 0 is 0
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A16.js
 * @description Compare Number('0x0') and Number('0X0') with 0
 */

// CHECK#1
if (Number("0") !== 0) {
  $ERROR('#1: Number("0") === 0. Actual: ' + (Number("0")));
}

// CHECK#2
if (+("0x0") !== 0) {
  $ERROR('#2: +("0x0") === 0. Actual: ' + (+("0x0")));
}

// CHECK#3
if (Number("0X0") !== 0) {
  $ERROR('#3: Number("0X0") === 0. Actual: ' + (Number("0X0")));
}

