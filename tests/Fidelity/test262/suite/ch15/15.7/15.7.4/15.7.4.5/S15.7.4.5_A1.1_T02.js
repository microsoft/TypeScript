// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Step 1: Let f be ToInteger(fractionDigits). (If fractionDigits
 * is undefined, this step produces the value 0)
 *
 * @path ch15/15.7/15.7.4/15.7.4.5/S15.7.4.5_A1.1_T02.js
 * @description calling on Number object
 */

//CHECK#1
if((new Number(1)).toFixed() !== "1"){
  $ERROR('#1: (new Number(1)).prototype.toFixed() === "1"');
}

//CHECK#2
if((new Number(1)).toFixed(0) !== "1"){
  $ERROR('#2: (new Number(1)).prototype.toFixed(0) === "1"');
}

//CHECK#3
if((new Number(1)).toFixed(1) !== "1.0"){
  $ERROR('#3: (new Number(1)).prototype.toFixed(1) === "1.0"');
}

//CHECK#4
if((new Number(1)).toFixed(1.1) !== "1.0"){
  $ERROR('#4: (new Number(1)).toFixed(1.1) === "1.0"');
}

//CHECK#5
if((new Number(1)).toFixed(0.9) !== "1"){
  $ERROR('#5: (new Number(1)).toFixed(0.9) === "1"');
}

//CHECK#6
if((new Number(1)).toFixed("1") !== "1.0"){
  $ERROR('#6: (new Number(1)).toFixed("1") === "1.0"');
}

//CHECK#7
if((new Number(1)).toFixed("1.1") !== "1.0"){
  $ERROR('#7: (new Number(1)).toFixed("1.1") === "1.0"');
}

//CHECK#8
if((new Number(1)).toFixed("0.9") !== "1"){
  $ERROR('#8: (new Number(1)).toFixed("0.9") === "1"');
}

//CHECK#9
if((new Number(1)).toFixed(Number.NaN) !== "1"){
  $ERROR('#9: (new Number(1)).toFixed(Number.NaN) === "1"');
}

//CHECK#10
if((new Number(1)).toFixed("some string") !== "1"){
  $ERROR('#9: (new Number(1)).toFixed("some string") === "1"');
}

//CHECK#10
try{
  if((new Number(1)).toFixed(-0.1) !== "1"){
    $ERROR('#10: (new Number(1)).toFixed(-0.1) === "1"');
  }
}
catch(e){
  $ERROR('#10: (new Number(1)).toFixed(-0.1) should not throw '+e);
}

