// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigit ::: 3 or of HexDigit ::: 3 is 3
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A19.js
 * @description Compare Number('0x3') and Number('0X3') with 3
 */

// CHECK#1
if (Number("3") !== 3)  {
  $ERROR('#1: Number("3") === 3. Actual: ' + (Number("3")));
}

// CHECK#2
if (+("0x3") !== 3)  {
  $ERROR('#2: +("0x3") === 3. Actual: ' + (+("0x3")));
}

// CHECK#3
if (Number("0X3") !== 3)  {
  $ERROR('#3: Number("0X3") === 3. Actual: ' + (Number("0X3")));
}

