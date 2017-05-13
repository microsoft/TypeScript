// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of SignedInteger ::: - DecimalDigits is the negative of the MV of DecimalDigits
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A15.js
 * @description Compare -Number('1234567890') with ('-1234567890')
 */

// CHECK#1
if (+("-1234567890") !== -Number("1234567890"))  {
  $ERROR('#1: +("-1234567890") === -Number("1234567890")');
}

