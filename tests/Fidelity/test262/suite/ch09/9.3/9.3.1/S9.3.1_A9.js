// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StrUnsignedDecimalLiteral::: DecimalDigits. DecimalDigits ExponentPart
 * is (the MV of the first DecimalDigits plus (the MV of the second DecimalDigits times
 * 10<sup><small>-n</small></sup>)) times 10<sup><small>e</small></sup>, where n is the number
 * of characters in the second DecimalDigits and e is the MV of ExponentPart
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A9.js
 * @description Compare Number('1234.5678e9') with (Number('1234')+(Number('5678')*1e-4))*1e9,
 * and +('1234.5678e-9') with (Number('1234')+(Number('5678')*1e-4))*1e-9
 */

// CHECK#1
if (Number("1234.5678e9") !== (Number("1234")+(Number("5678")*1e-4))*1e9)  {
  $ERROR('#1: Number("1234.5678e9") === (Number("1234")+(Number("5678")*1e-4))*1e9');
}

// CHECK#2
if (+("1234.5678e-9") !== (Number("1234")+(Number("5678")*1e-4))*1e-9)  {
  $ERROR('#2: +("1234.5678e-9") === (Number("1234")+(Number("5678")*1e-4))*1e-9');
}

