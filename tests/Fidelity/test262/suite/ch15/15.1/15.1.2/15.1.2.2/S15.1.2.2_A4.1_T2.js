// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If R = 0 or R = undefined, then R = 10
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A4.1_T2.js
 * @description R = undefined
 */

//CHECK#0
if (parseInt("0") !== parseInt("0", 10)) {
  $ERROR('#0: parseInt("0") === parseInt("0", 10). Actual: ' + (parseInt("0")));
}  

//CHECK#1
if (parseInt("1") !== parseInt("1", 10)) {
  $ERROR('#1: parseInt("1") === parseInt("01", 10). Actual: ' + (parseInt("1")));
}  

//CHECK#2
if (parseInt("2") !== parseInt("2", 10)) {
  $ERROR('#2: parseInt("2") === parseInt("2", 10). Actual: ' + (parseInt("2")));
}  

//CHECK#3
if (parseInt("3") !== parseInt("3", 10)) {
  $ERROR('#3: parseInt("3") === parseInt("3", 10). Actual: ' + (parseInt("3")));
} 

//CHECK#4
if (parseInt("4") !== parseInt("4", 10)) {
  $ERROR('#4: parseInt("4") === parseInt(4", 10). Actual: ' + (parseInt("4")));
} 

//CHECK#5
if (parseInt("5") !== parseInt("5", 10)) {
  $ERROR('#5: parseInt("5") === parseInt("5", 10). Actual: ' + (parseInt("5")));
}  

//CHECK#6
if (parseInt("6") !== parseInt("6", 10)) {
  $ERROR('#6: parseInt("6") === parseInt("6", 10). Actual: ' + (parseInt("6")));
}  

//CHECK#7
if (parseInt("7") !== parseInt("7", 10)) {
  $ERROR('#7: parseInt("7") === parseInt("7", 10). Actual: ' + (parseInt("7")));
}  

//CHECK#8
if (parseInt("8") !== parseInt("8", 10)) {
  $ERROR('#8: parseInt("8") === parseInt("8", 10). Actual: ' + (parseInt("8")));
}  

//CHECK#9
if (parseInt("9") !== parseInt("9", 10)) {
  $ERROR('#9: parseInt("9") === parseInt("9", 10). Actual: ' + (parseInt("9")));
}  

//CHECK#10
if (parseInt("10") !== parseInt("10", 10)) {
  $ERROR('#10: parseInt("10") === parseInt("10", 10). Actual: ' + (parseInt("10")));
}  

//CHECK#11
if (parseInt("11") !== parseInt("11", 10)) {
  $ERROR('#11: parseInt("11") === parseInt("11", 10). Actual: ' + (parseInt("11")));
}  

//CHECK#12
if (parseInt("9999") !== parseInt("9999", 10)) {
  $ERROR('#12: parseInt("9999") === parseInt("9999", 10). Actual: ' + (parseInt("9999")));
}  

