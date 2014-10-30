// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of HexDigit ::: e or of HexDigit ::: E is 14
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A30.js
 * @description Compare Number('0xE'), Number('0XE'), Number('0xe') and Number('0Xe') with 14
 */

// CHECK#1
if (Number("0xe") !== 14)  {
  $ERROR('#1: Number("0xe") === 14. Actual: ' + (Number("0xe")));
}

// CHECK#2
if (Number("0xE") !== 14)  {
  $ERROR('#2: Number("0xE") === 14. Actual: ' + (Number("0xE")));
}

// CHECK#3
if (Number("0Xe") !== 14)  {
  $ERROR('#3: Number("0Xe") === 14. Actual: ' + (Number("0Xe")));
}

// CHECK#4
if (+("0XE") !== 14)  {
  $ERROR('#4: +("0XE") === 14. Actual: ' + (+("0XE")));
}

