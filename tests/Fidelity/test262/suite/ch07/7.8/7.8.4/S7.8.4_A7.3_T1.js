// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * \u HexDigit HexDigit HexDigit HexDigit DoubleStringCharacter
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A7.3_T1.js
 * @description Check similar to ("\u0001F" === String.fromCharCode("1") + "F")
 */

//CHECK#1
if ("\u0001F" !== String.fromCharCode("1") + "F") {
  $ERROR('#1: "\\u0001F" === String.fromCharCode("1") + "F"');
}

//CHECK#2
if ("\u0002E" !== String.fromCharCode("2") + "E") {
  $ERROR('#2: "\\u0002E" === String.fromCharCode("2") + "E"');
}

//CHECK#3
if ("\u0003D" !== String.fromCharCode("3") + "D") {
  $ERROR('#3: "\\u0003D" === String.fromCharCode("3") + "D"');
}

//CHECK#4
if ("\u0004C" !== String.fromCharCode("4") + "C") {
  $ERROR('#4: "\\u0004C" === String.fromCharCode("4") + "C"');
}

//CHECK#5
if ("\u0005B" !== String.fromCharCode("5") + "B") {
  $ERROR('#5: "\\u0005B" === String.fromCharCode("5") + "B"');
}

//CHECK#6
if ("\u0006A" !== String.fromCharCode("6") + "A") {
  $ERROR('#6: "\\u0006A" === String.fromCharCode("6") + "A"');
}

//CHECK#7
if ("\u00079" !== String.fromCharCode("7") + "9") {
  $ERROR('#7: "\\u00079" === String.fromCharCode("7") + "9"');
}

//CHECK#8
if ("\u00088" !== String.fromCharCode("8") + "8") {
  $ERROR('#8: "\\u00088" === String.fromCharCode("8") + "8"');
}

//CHECK#9
if ("\u00097" !== String.fromCharCode("9") + "7") {
  $ERROR('#9: "\\u00097" === String.fromCharCode("9") + "7"');
}

//CHECK#A
if ("\u000A6" !== String.fromCharCode("10") + "6") {
  $ERROR('#A: "\\u000A6" === String.fromCharCode("10") + "6"');
}

//CHECK#B
if ("\u000B5" !== String.fromCharCode("11") + "5") {
  $ERROR('#B: "\\u000B5" === String.fromCharCode("11") + "5"');
}

//CHECK#C
if ("\u000C4" !== String.fromCharCode("12") + "4") {
  $ERROR('#C: "\\u000C4" === String.fromCharCode("12") + "4"');
}

//CHECK#D
if ("\u000D3" !== String.fromCharCode("13") + "3") {
  $ERROR('#D: "\\u000D3" === String.fromCharCode("13") + "3"');
}

//CHECK#E
if ("\u000E2" !== String.fromCharCode("14") + "2") {
  $ERROR('#E: "\\u000E2" === String.fromCharCode("14") + "2"');
}

//CHECK#F
if ("\u000F1" !== String.fromCharCode("15") + "1") {
  $ERROR('#F: "\\u000F1" === String.fromCharCode("15") + "1"');
}

