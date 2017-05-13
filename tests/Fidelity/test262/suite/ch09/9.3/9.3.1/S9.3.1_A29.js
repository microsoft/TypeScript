// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of HexDigit ::: d or of HexDigit ::: D is 13
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A29.js
 * @description Compare Number('0xD'), Number('0XD'), Number('0xd') and Number('0Xd') with 13
 */

// CHECK#1
if (+("0xd") !== 13)  {
  $ERROR('#1: +("0xd") === 13. Actual: ' + (+("0xd")));
}

// CHECK#2
if (Number("0xD") !== 13)  {
  $ERROR('#2: Number("0xD") === 13. Actual: ' + (Number("0xD")));
}

// CHECK#3
if (Number("0Xd") !== 13)  {
  $ERROR('#3: Number("0Xd") === 13. Actual: ' + (Number("0Xd")));
}

// CHECK#4
if (Number("0XD") !== 13)  {
  $ERROR('#4: Number("0XD") === 13. Actual: ' + (Number("0XD")));
}

