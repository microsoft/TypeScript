// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * toString: If radix is an integer from 2 to 36, but not 10,
 * the result is a string, the choice of which is implementation-dependent
 *
 * @path ch15/15.7/15.7.4/15.7.4.2/S15.7.4.2_A2_T19.js
 * @description radix is 21
 */

//CHECK#1
if(Number.prototype.toString(21) !== "0"){
  $ERROR('#1: Number.prototype.toString(21) === "0"');
}

//CHECK#2
if((new Number()).toString(21) !== "0"){
  $ERROR('#2: (new Number()).toString(21) === "0"');
}

//CHECK#3
if((new Number(0)).toString(21) !== "0"){
  $ERROR('#3: (new Number(0)).toString(21) === "0"');
}

//CHECK#4
if((new Number(-1)).toString(21) !== "-1"){
  $ERROR('#4: (new Number(-1)).toString(21) === "-1"');
}

//CHECK#5
if((new Number(1)).toString(21) !== "1"){
  $ERROR('#5: (new Number(1)).toString(21) === "1"');
}

//CHECK#6
if((new Number(Number.NaN)).toString(21) !== "NaN"){
  $ERROR('#6: (new Number(Number.NaN)).toString(21) === "NaN"');
}

//CHECK#7
if((new Number(Number.POSITIVE_INFINITY)).toString(21) !== "Infinity"){
  $ERROR('#7: (new Number(Number.POSITIVE_INFINITY)).toString(21) === "Infinity"');
}

//CHECK#8
if((new Number(Number.NEGATIVE_INFINITY)).toString(21) !== "-Infinity"){
  $ERROR('#8: (new Number(Number.NEGATIVE_INFINITY)).toString(21) === "-Infinity"');
}

