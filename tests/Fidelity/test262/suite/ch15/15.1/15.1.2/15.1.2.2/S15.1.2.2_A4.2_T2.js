// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If R < 2 or R > 36, then return NaN
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A4.2_T2.js
 * @description R = 37
 */

//CHECK#0
if (isNaN(parseInt("0", 37)) !== true) {
  $ERROR('#0: parseInt("0", 37) === Not-a-Number. Actual: ' + (parseInt("0", 37)));
}  

//CHECK#1
if (isNaN(parseInt("1", 37)) !== true) {
  $ERROR('#1: parseInt("1", 37) === Not-a-Number. Actual: ' + (parseInt("1", 37)));
}  

//CHECK#2
if (isNaN(parseInt("2", 37)) !== true) {
  $ERROR('#2: parseInt("2", 37) === Not-a-Number. Actual: ' + (parseInt("2", 37)));
}  

//CHECK#3
if (isNaN(parseInt("3", 37)) !== true) {
  $ERROR('#3: parseInt("3", 37) === Not-a-Number. Actual: ' + (parseInt("3", 37)));
} 

//CHECK#4
if (isNaN(parseInt("4", 37)) !== true) {
  $ERROR('#4: parseInt("4", 37) === Not-a-Number. Actual: ' + (parseInt("4", 37)));
} 

//CHECK#5
if (isNaN(parseInt("5", 37)) !== true) {
  $ERROR('#5: parseInt("5", 37) === Not-a-Number. Actual: ' + (parseInt("5", 37)));
}  

//CHECK#6
if (isNaN(parseInt("6", 37)) !== true) {
  $ERROR('#6: parseInt("6", 37) === Not-a-Number. Actual: ' + (parseInt("6", 37)));
}  

//CHECK#7
if (isNaN(parseInt("7", 37)) !== true) {
  $ERROR('#7: parseInt("7", 37) === Not-a-Number. Actual: ' + (parseInt("7", 37)));
}  

//CHECK#8
if (isNaN(parseInt("8", 37)) !== true) {
  $ERROR('#8: parseInt("8", 37) === Not-a-Number. Actual: ' + (parseInt("8", 37)));
}  

//CHECK#9
if (isNaN(parseInt("9", 37)) !== true) {
  $ERROR('#9: parseInt("9", 37) === Not-a-Number. Actual: ' + (parseInt("9", 37)));
}  

//CHECK#10
if (isNaN(parseInt("10", 37)) !== true) {
  $ERROR('#10: parseInt("10", 37) === Not-a-Number. Actual: ' + (parseInt("10", 37)));
}  

//CHECK#11
if (isNaN(parseInt("11", 37)) !== true) {
  $ERROR('#11: parseInt("11", 37) === Not-a-Number. Actual: ' + (parseInt("11", 37)));
}  

