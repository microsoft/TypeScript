// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of DecimalDigits ::: DecimalDigits DecimalDigit is
 * (the MV of DecimalDigits times 10) plus the MV of DecimalDigit
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A13.js
 * @description Compare '12' with Number("1")*10+Number("2") and analogous
 */

// CHECK#1
if (+("12") !== Number("1")*10+Number("2"))  {
  $ERROR('#1: +("12") === Number("1")*10+Number("2")');
}

// CHECK#2
if (Number("123") !== Number("12")*10+Number("3"))  {
  $ERROR('#2: Number("123") === Number("12")*10+Number("3")');
}

// CHECK#2
if (Number("1234") !== Number("123")*10+Number("4"))  {
  $ERROR('#2: Number("1234") === Number("123")*10+Number("4")');
}

