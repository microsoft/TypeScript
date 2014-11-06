// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StrUnsignedDecimalLiteral::: DecimalDigits ExponentPart
 * is the MV of DecimalDigits times 10<sup><small>e</small></sup>, where e is the MV of ExponentPart
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A12.js
 * @description Compare Number('12345e6') with +('12345')*1e1,
 * and Number('12345e-6') !== Number('12345')*1e-6
 */

// CHECK#1
if (Number("12345e6") !== +("12345")*1e6)  {
  $ERROR('#1: Number("12345e6") === +("12345")*1e6');
}

// CHECK#2
if (Number("12345e-6") !== Number("12345")*1e-6)  {
  $ERROR('#2: Number("12345e-6") === Number("12345")*1e-6');
}

