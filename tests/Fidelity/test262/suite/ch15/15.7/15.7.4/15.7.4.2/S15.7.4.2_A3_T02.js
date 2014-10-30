// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * toString: radix should be an integer between 2 and 36
 *
 * @path ch15/15.7/15.7.4/15.7.4.2/S15.7.4.2_A3_T02.js
 * @description radix is 37
 */

//CHECK#1
try{
  var n =Number.prototype.toString(37);
  $ERROR('#1: Number.prototype.toString(37) should throw an Error');
}
catch(e){
}

//CHECK#2
try{
  var n =(new Number()).toString(37);
  $ERROR('#2: (new Number()).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#3
try{
  var n =(new Number(0)).toString(37);
  $ERROR('#3: (new Number(0)).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#4
try{
  var n =(new Number(-1)).toString(37);
  $ERROR('#4: (new Number(-1)).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#5
try{
  var n =(new Number(1)).toString(37);
  $ERROR('#5: (new Number(1)).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#6
try{
  var n =(new Number(Number.NaN)).toString(37);
  $ERROR('#6: (new Number(Number.NaN)).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#7
try{
  var n =(new Number(Number.POSITIVE_INFINITY)).toString(37);
  $ERROR('#7: (new Number(Number.POSITIVE_INFINITY)).toString(37) should throw an Error');
}
catch(e){
}

//CHECK#8
try{
  var n =(new Number(Number.NEGATIVE_INFINITY)).toString(37);
  $ERROR('#8: (new Number(Number.NEGATIVE_INFINITY)).toString(37) should throw an Error');
}
catch(e){
}

