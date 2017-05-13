// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * EscapeSequence :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit HexDigit
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A7.1_T1.js
 * @description Check similar to ("\u0000" === String.fromCharCode("0"))
 */

//CHECK#0
if ("\u0000" !== String.fromCharCode("0")) {
  $ERROR('#0: "\\u0000" === String.fromCharCode("0")');
}

//CHECK#1
if ("\u0001" !== String.fromCharCode("1")) {
  $ERROR('#1: "\\u0001" === String.fromCharCode("1")');
}

//CHECK#2
if ("\u0002" !== String.fromCharCode("2")) {
  $ERROR('#2: "\\u0002" === String.fromCharCode("2")');
}

//CHECK#3
if ("\u0003" !== String.fromCharCode("3")) {
  $ERROR('#3: "\\u0003" === String.fromCharCode("3")');
}

//CHECK#4
if ("\u0004" !== String.fromCharCode("4")) {
  $ERROR('#4: "\\u0004" === String.fromCharCode("4")');
}

//CHECK#5
if ("\u0005" !== String.fromCharCode("5")) {
  $ERROR('#5: "\\u0005" === String.fromCharCode("5")');
}

//CHECK#6
if ("\u0006" !== String.fromCharCode("6")) {
  $ERROR('#6: "\\u0006" === String.fromCharCode("6")');
}

//CHECK#7
if ("\u0007" !== String.fromCharCode("7")) {
  $ERROR('#7: "\\u0007" === String.fromCharCode("7")');
}

//CHECK#8
if ("\u0008" !== String.fromCharCode("8")) {
  $ERROR('#8: "\\u0008" === String.fromCharCode("8")');
}

//CHECK#9
if ("\u0009" !== String.fromCharCode("9")) {
  $ERROR('#9: "\\u0009" === String.fromCharCode("9")');
}

//CHECK#A
if ("\u000A" !== String.fromCharCode("10")) {
  $ERROR('#A: "\\u000A" === String.fromCharCode("10")');
}

//CHECK#B
if ("\u000B" !== String.fromCharCode("11")) {
  $ERROR('#B: "\\u000B" === String.fromCharCode("11")');
}

//CHECK#C
if ("\u000C" !== String.fromCharCode("12")) {
  $ERROR('#C: "\\u000C" === String.fromCharCode("12")');
}

//CHECK#D
if ("\u000D" !== String.fromCharCode("13")) {
  $ERROR('#D: "\\u000D" === String.fromCharCode("13")');
}

//CHECK#E
if ("\u000E" !== String.fromCharCode("14")) {
  $ERROR('#E: "\\u000E" === String.fromCharCode("14")');
}

//CHECK#F
if ("\u000F" !== String.fromCharCode("15")) {
  $ERROR('#F: "\\u000F" === String.fromCharCode("15")');
}

