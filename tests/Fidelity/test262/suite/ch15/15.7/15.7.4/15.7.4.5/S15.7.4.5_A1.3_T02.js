// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Step 4: If this number value is NaN, return the string "NaN"
 *
 * @path ch15/15.7/15.7.4/15.7.4.5/S15.7.4.5_A1.3_T02.js
 * @description direct usage of NaN
 */

//CHECK#1
if(Number.NaN.toFixed() !== "NaN"){
  $ERROR('#1: Number.NaN.prototype.toFixed() === "NaN"');
}

//CHECK#2
if(Number.NaN.toFixed(0) !== "NaN"){
  $ERROR('#2: Number.NaN.prototype.toFixed(0) === "NaN"');
}

//CHECK#3
if(Number.NaN.toFixed(1) !== "NaN"){
  $ERROR('#3: Number.NaN.prototype.toFixed(1) === "NaN"');
}

//CHECK#4
if(Number.NaN.toFixed(1.1) !== "NaN"){
  $ERROR('#4: Number.NaN.toFixed(1.1) === "NaN"');
}

//CHECK#5
if(Number.NaN.toFixed(0.9) !== "NaN"){
  $ERROR('#5: Number.NaN.toFixed(0.9) === "NaN"');
}

//CHECK#6
if(Number.NaN.toFixed("1") !== "NaN"){
  $ERROR('#6: Number.NaN.toFixed("1") === "NaN"');
}

//CHECK#7
if(Number.NaN.toFixed("1.1") !== "NaN"){
  $ERROR('#7: Number.NaN.toFixed("1.1") === "NaN"');
}

//CHECK#8
if(Number.NaN.toFixed("0.9") !== "NaN"){
  $ERROR('#8: Number.NaN.toFixed("0.9") === "NaN"');
}

//CHECK#9
if(Number.NaN.toFixed(Number.NaN) !== "NaN"){
  $ERROR('#9: Number.NaN.toFixed(Number.NaN) === "NaN"');
}

//CHECK#10
if(Number.NaN.toFixed("some string") !== "NaN"){
  $ERROR('#9: Number.NaN.toFixed("some string") === "NaN"');
}

//CHECK#10
try{
  s = Number.NaN.toFixed(Number.POSITIVE_INFINITY);
  $ERROR('#10: Number.NaN.toFixed(Number.POSITIVE_INFINITY) should throw RangeError, not return NaN');
}
catch(e){
  if(!(e instanceof RangeError)){
    $ERROR('#10: Number.NaN.toFixed(Number.POSITIVE_INFINITY) should throw RangeError, not '+e);
  }
}

