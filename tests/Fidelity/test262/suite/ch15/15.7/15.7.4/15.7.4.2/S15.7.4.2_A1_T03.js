// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * toString: If radix is the number 10 or undefined, then this
 * number value is given as an argument to the ToString operator.
 * the resulting string value is returned
 *
 * @path ch15/15.7/15.7.4/15.7.4.2/S15.7.4.2_A1_T03.js
 * @description radix is undefined value
 */

//CHECK#1
if(Number.prototype.toString(undefined) !== "0"){
  $ERROR('#1: Number.prototype.toString(undefined) === "0"');
}

//CHECK#2
if((new Number()).toString(undefined) !== "0"){
  $ERROR('#2: (new Number()).toString(undefined) === "0"');
}

//CHECK#3
if((new Number(0)).toString(undefined) !== "0"){
  $ERROR('#3: (new Number(0)).toString(undefined) === "0"');
}

//CHECK#4
if((new Number(-1)).toString(undefined) !== "-1"){
  $ERROR('#4: (new Number(-1)).toString(undefined) === "-1"');
}

//CHECK#5
if((new Number(1)).toString(undefined) !== "1"){
  $ERROR('#5: (new Number(1)).toString(undefined) === "1"');
}

//CHECK#6
if((new Number(Number.NaN)).toString(undefined) !== "NaN"){
  $ERROR('#6: (new Number(Number.NaN)).toString(undefined) === "NaN"');
}

//CHECK#7
if((new Number(Number.POSITIVE_INFINITY)).toString(undefined) !== "Infinity"){
  $ERROR('#7: (new Number(Number.POSITIVE_INFINITY)).toString(undefined) === "Infinity"');
}

//CHECK#8
if((new Number(Number.NEGATIVE_INFINITY)).toString(undefined) !== "-Infinity"){
  $ERROR('#8: (new Number(Number.NEGATIVE_INFINITY)).toString(undefined) === "-Infinity"');
}

