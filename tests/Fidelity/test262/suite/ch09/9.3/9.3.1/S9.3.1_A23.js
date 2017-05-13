// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigit ::: 7 or of HexDigit ::: 7 is 7
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A23.js
 * @description Compare Number('0x7') and Number('0X7') with 7
 */

// CHECK#1
if (Number("7") !== 7)  {
  $ERROR('#1: Number("7") === 7. Actual: ' + (Number("7")));
}

// CHECK#2
if (Number("0x7") !== 7)  {
  $ERROR('#2: Number("0x7") === 7. Actual: ' + (Number("0x7")));
}

// CHECK#3
if (+("0X7") !== 7)  {
  $ERROR('#3: +("0X7") === 7. Actual: ' + (+("0X7")));
}

