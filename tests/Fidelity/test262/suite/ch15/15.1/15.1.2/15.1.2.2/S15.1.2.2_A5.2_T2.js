// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the length of S is at least 2 and the first two characters of S
 * are either 0x or 0X, then remove the first two characters from S and let R = 16
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A5.2_T2.js
 * @description : 0X
 */

//CHECK#0
if (parseInt("0X0", 0)  !== parseInt("0", 16)) {
  $ERROR('#0: parseInt("0X0", 0) === parseInt("0", 16). Actual: ' + (parseInt("0X0", 0)));
}

//CHECK#1
if (parseInt("0X1")  !== parseInt("1", 16)) {
  $ERROR('#1: parseInt("0X1") === parseInt("1", 16). Actual: ' + (parseInt("0X1")));
}

//CHECK#2
if (parseInt("0X2")  !== parseInt("2", 16)) {
  $ERROR('#2: parseInt("0X2") === parseInt("2", 16). Actual: ' + (parseInt("0X2")));
}

//CHECK#3
if (parseInt("0X3")  !== parseInt("3", 16)) {
  $ERROR('#3: parseInt("0X3") === parseInt("3", 16). Actual: ' + (parseInt("0X3")));
}

//CHECK#4
if (parseInt("0X4")  !== parseInt("4", 16)) {
  $ERROR('#4: parseInt("0X4") === parseInt("4", 16). Actual: ' + (parseInt("0X4")));
}

//CHECK#5
if (parseInt("0X5")  !== parseInt("5", 16)) {
  $ERROR('#5: parseInt("0X5") === parseInt("5", 16). Actual: ' + (parseInt("0X5")));
}

//CHECK#6
if (parseInt("0X6")  !== parseInt("6", 16)) {
  $ERROR('#6: parseInt("0X6") === parseInt("6", 16). Actual: ' + (parseInt("0X6")));
}

//CHECK#7
if (parseInt("0X7")  !== parseInt("7", 16)) {
  $ERROR('#7: parseInt("0X7") === parseInt("7", 16). Actual: ' + (parseInt("0X7")));
}

//CHECK#8
if (parseInt("0X8")  !== parseInt("8", 16)) {
  $ERROR('#8: parseInt("0X8") === parseInt("8", 16). Actual: ' + (parseInt("0X8")));
}

//CHECK#9
if (parseInt("0X9")  !== parseInt("9", 16)) {
  $ERROR('#9: parseInt("0X9") === parseInt("9", 16). Actual: ' + (parseInt("0X9")));
}

//CHECK#A
if (parseInt("0XA")  !== parseInt("A", 16)) {
  $ERROR('#A: parseInt("0XA") === parseInt("A", 16). Actual: ' + (parseInt("0XA")));
}

//CHECK#B
if (parseInt("0XB")  !== parseInt("B", 16)) {
  $ERROR('#B: parseInt("0XB") === parseInt("B", 16). Actual: ' + (parseInt("0XB")));
}

//CHECK#C
if (parseInt("0XC")  !== parseInt("C", 16)) {
  $ERROR('#C: parseInt("0XC") === parseInt("C", 16). Actual: ' + (parseInt("0XC")));
}

//CHECK#D
if (parseInt("0XD")  !== parseInt("D", 16)) {
  $ERROR('#D: parseInt("0XD") === parseInt("D", 16). Actual: ' + (parseInt("0XD")));
}

//CHECK#E
if (parseInt("0XE")  !== parseInt("E", 16)) {
  $ERROR('#E: parseInt("0XE") === parseInt("E", 16). Actual: ' + (parseInt("0XE")));
}

//CHECK#F
if (parseInt("0XF")  !== parseInt("F", 16)) {
  $ERROR('#F: parseInt("0XF") === parseInt("F", 16). Actual: ' + (parseInt("0XF")));
}

//CHECK#E
if (parseInt("0XE")  !== parseInt("E", 16)) {
  $ERROR('#E: parseInt("0XE") === parseInt("E", 16). Actual: ' + (parseInt("0XE")));
}

//CHECK#ABCDEF
if (parseInt("0XABCDEF")  !== parseInt("ABCDEF", 16)) {
  $ERROR('#ABCDEF: parseInt("0XABCDEF") === parseInt("ABCDEF", 16). Actual: ' + (parseInt("0XABCDEF")));
}     

