// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of HexDigit ::: a or of HexDigit ::: A is 10
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A26.js
 * @description Compare Number('0xA'), Number('0XA'), Number('0xa') and Number('0Xa') with 10
 */

// CHECK#1
if (Number("0xa") !== 10)  {
  $ERROR('#1: Number("0xa") === 10. Actual: ' + (Number("0xa")));
}

// CHECK#2
if (Number("0xA") !== 10)  {
  $ERROR('#2: Number("0xA") === 10. Actual: ' + (Number("0xA")));
}

// CHECK#3
if (Number("0Xa") !== 10)  {
  $ERROR('#3: Number("0Xa") === 10. Actual: ' + (Number("0Xa")));
}

// CHECK#4
if (+("0XA") !== 10)  {
  $ERROR('#4: +("0XA") === 10. Actual: ' + (+("0XA")));
}

