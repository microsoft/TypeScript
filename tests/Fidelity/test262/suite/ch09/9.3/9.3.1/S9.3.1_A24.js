// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigit ::: 8 or of HexDigit ::: 8 is 8
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A24.js
 * @description Compare Number('0x8') and Number('0X8') with 8
 */

// CHECK#1
if (+("8") !== 8)  {
  $ERROR('#1: +("8") === 8. Actual: ' + (+("8")));
}

// CHECK#2
if (Number("0x8") !== 8)  {
  $ERROR('#2: Number("0x8") === 8. Actual: ' + (Number("0x8")));
}

// CHECK#3
if (Number("0X8") !== 8)  {
  $ERROR('#3: Number("0X8") === 8. Actual: ' + (Number("0X8")));
}

