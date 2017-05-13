// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of HexDigit ::: b or of HexDigit ::: B is 11
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A27.js
 * @description Compare Number('0xB'), Number('0XB'), Number('0xb') and Number('0Xb') with 11
 */

// CHECK#1
if (Number("0xb") !== 11)  {
  $ERROR('#1: Number("0xb") === 11. Actual: ' + (Number("0xb")));
}

// CHECK#2
if (Number("0xB") !== 11)  {
  $ERROR('#2: Number("0xB") === 11. Actual: ' + (Number("0xB")));
}

// CHECK#3
if (+("0Xb") !== 11)  {
  $ERROR('#3: +("0Xb") === 11. Actual: ' + (+("0Xb")));
}

// CHECK#4
if (Number("0XB") !== 11)  {
  $ERROR('#4: Number("0XB") === 11. Actual: ' + (Number("0XB")));
}

