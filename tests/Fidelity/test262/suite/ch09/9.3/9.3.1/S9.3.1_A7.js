// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StrUnsignedDecimalLiteral::: DecimalDigits. DecimalDigits
 * is the MV of the first DecimalDigits plus the MV of the second DecimalDigits times
 * 10<sup><small>-n</small></sup>, where n is the number of characters in the second DecimalDigits
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A7.js
 * @description Compare Number('1234.5678') with Number('1234')+(+('5678')*1e-4)
 */

// CHECK#1
if (Number("1234.5678") !== Number("1234")+(+("5678")*1e-4))  {
  $ERROR('#1: Number("1234.5678") === Number("1234")+(+("5678")*1e-4)');
}

