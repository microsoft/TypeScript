// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigit ::: 4 or of HexDigit ::: 4 is 4
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A20.js
 * @description Compare Number('0x4') and Number('0X4') with 4
 */

// CHECK#1
if (Number("4") !== 4)  {
  $ERROR('#1: Number("4") === 4. Actual: ' + (Number("4")));
}

// CHECK#2
if (Number("0x4") !== 4)  {
  $ERROR('#2: Number("0x4") === 4. Actual: ' + (Number("0x4")));
}

// CHECK#3
if (+("0X4") !== 4)  {
  $ERROR('#3: +("0X4") === 4. Actual: ' + (+("0X4")));
}

