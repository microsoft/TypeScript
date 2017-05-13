// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If R < 2 or R > 36, then return NaN
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A4.2_T1.js
 * @description R = 1
 */

//CHECK#0
if (isNaN(parseInt("0", 1)) !== true) {
  $ERROR('#0: parseInt("0", 1) === Not-a-Number. Actual: ' + (parseInt("0", 1)));
}  

//CHECK#1
if (isNaN(parseInt("1", 1)) !== true) {
  $ERROR('#1: parseInt("1", 1) === Not-a-Number. Actual: ' + (parseInt("1", 1)));
}  

//CHECK#2
if (isNaN(parseInt("2", 1)) !== true) {
  $ERROR('#2: parseInt("2", 1) === Not-a-Number. Actual: ' + (parseInt("2", 1)));
}  

//CHECK#3
if (isNaN(parseInt("3", 1)) !== true) {
  $ERROR('#3: parseInt("3", 1) === Not-a-Number. Actual: ' + (parseInt("3", 1)));
} 

//CHECK#4
if (isNaN(parseInt("4", 1)) !== true) {
  $ERROR('#4: parseInt("4", 1) === Not-a-Number. Actual: ' + (parseInt("4", 1)));
} 

//CHECK#5
if (isNaN(parseInt("5", 1)) !== true) {
  $ERROR('#5: parseInt("5", 1) === Not-a-Number. Actual: ' + (parseInt("5", 1)));
}  

//CHECK#6
if (isNaN(parseInt("6", 1)) !== true) {
  $ERROR('#6: parseInt("6", 1) === Not-a-Number. Actual: ' + (parseInt("6", 1)));
}  

//CHECK#7
if (isNaN(parseInt("7", 1)) !== true) {
  $ERROR('#7: parseInt("7", 1) === Not-a-Number. Actual: ' + (parseInt("7", 1)));
}  

//CHECK#8
if (isNaN(parseInt("8", 1)) !== true) {
  $ERROR('#8: parseInt("8", 1) === Not-a-Number. Actual: ' + (parseInt("8", 1)));
}  

//CHECK#9
if (isNaN(parseInt("9", 1)) !== true) {
  $ERROR('#9: parseInt("9", 1) === Not-a-Number. Actual: ' + (parseInt("9", 1)));
}  

//CHECK#10
if (isNaN(parseInt("10", 1)) !== true) {
  $ERROR('#10: parseInt("10", 1) === Not-a-Number. Actual: ' + (parseInt("10", 1)));
}  

//CHECK#11
if (isNaN(parseInt("11", 1)) !== true) {
  $ERROR('#11: parseInt("11", 1) === Not-a-Number. Actual: ' + (parseInt("11", 1)));
}  

