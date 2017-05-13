// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Step 9: If x >= 10^21, let m = ToString(x)
 *
 * @path ch15/15.7/15.7.4/15.7.4.5/S15.7.4.5_A1.4_T01.js
 * @description x is 10^21
 */

//CHECK#1
if((new Number(1e21)).toFixed() !== String(1e21)){
  $ERROR('#1: (new Number(1e21)).prototype.toFixed() === String(1e21)');
}

//CHECK#2
if((new Number(1e21)).toFixed(0) !== String(1e21)){
  $ERROR('#2: (new Number(1e21)).prototype.toFixed(0) === String(1e21)');
}

//CHECK#3
if((new Number(1e21)).toFixed(1) !== String(1e21)){
  $ERROR('#3: (new Number(1e21)).prototype.toFixed(1) === String(1e21)');
}

//CHECK#4
if((new Number(1e21)).toFixed(1.1) !== String(1e21)){
  $ERROR('#4: (new Number(1e21)).toFixed(1.1) === String(1e21)');
}

//CHECK#5
if((new Number(1e21)).toFixed(0.9) !== String(1e21)){
  $ERROR('#5: (new Number(1e21)).toFixed(0.9) === String(1e21)');
}

//CHECK#6
if((new Number(1e21)).toFixed("1") !== String(1e21)){
  $ERROR('#6: (new Number(1e21)).toFixed("1") === String(1e21)');
}

//CHECK#7
if((new Number(1e21)).toFixed("1.1") !== String(1e21)){
  $ERROR('#7: (new Number(1e21)).toFixed("1.1") === String(1e21)');
}

//CHECK#8
if((new Number(1e21)).toFixed("0.9") !== String(1e21)){
  $ERROR('#8: (new Number(1e21)).toFixed("0.9") === String(1e21)');
}

//CHECK#9
if((new Number(1e21)).toFixed(Number.NaN) !== String(1e21)){
  $ERROR('#9: (new Number(1e21)).toFixed(Number.NaN) === String(1e21)');
}

//CHECK#10
if((new Number(1e21)).toFixed("some string") !== String(1e21)){
  $ERROR('#9: (new Number(1e21)).toFixed("some string") === String(1e21)');
}

//CHECK#10
try{
  s = (new Number(1e21)).toFixed(Number.POSITIVE_INFINITY);
  $ERROR('#10: (new Number(1e21)).toFixed(Number.POSITIVE_INFINITY) should throw RangeError, not return NaN');
}
catch(e){
  if(!(e instanceof RangeError)){
    $ERROR('#10: (new Number(1e21)).toFixed(Number.POSITIVE_INFINITY) should throw RangeError, not '+e);
  }
}

