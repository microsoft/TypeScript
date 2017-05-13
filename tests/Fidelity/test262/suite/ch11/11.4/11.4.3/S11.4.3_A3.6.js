// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of applying "typeof" operator to the object that is native and doesn't implement [[Call]] is "object"
 *
 * @path ch11/11.4/11.4.3/S11.4.3_A3.6.js
 * @description typeof (object without [[Call]]) === "object"
 */

//CHECK#1
if (typeof this !== "object") {
  $ERROR('#1: typeof this === "object". Actual: ' + (typeof this));
}

//CHECK#2
if (typeof new Object() !== "object") {
  $ERROR('#2: typeof new Object() === "object". Actual: ' + (typeof new Object()));
}

//CHECK#3
if (typeof new Array(1,2,3) !== "object") {
  $ERROR('#3: typeof new Array(1,2,3) === "object". Actual: ' + (typeof new Array(1,2,3)));
}

//CHECK#4
if (typeof Array(1,2,3) !== "object") {
  $ERROR('#4: typeof Array(1,2,3) === "object". Actual: ' + (typeof Array(1,2,3)));
}

//CHECK#5
if (typeof new String("x") !== "object") {
  $ERROR('#5: typeof new String("x") === "object". Actual: ' + (typeof new String("x")));
}

//CHECK#6
if (typeof new Boolean(true) !== "object") {
  $ERROR('#6: typeof new Boolean(true) === "object". Actual: ' + (typeof new Boolean(true)));
}

//CHECK#7
if (typeof new Number(1) !== "object") {
  $ERROR('#7: typeof new Number(1) === "object". Actual: ' + (typeof new Number(1)));
}

//CHECK#8
//The Math object does not have a [[Construct]] property; 
//it is not possible to use the Math object as a constructor with the new operator.
//The Math object does not have a [[Call]] property; it is not possible to invoke the Math object as a object.
if (typeof Math !== "object") {
  $ERROR('#8: typeof Math === "object". Actual: ' + (typeof Math));
}

//CHECK#9
if (typeof new Date() !== "object") {
  $ERROR('#9: typeof new Date() === "object". Actual: ' + (typeof new Date()));
}

//CHECK#10
if (typeof new Error() !== "object") {
  $ERROR('#10: typeof new Error() === "object". Actual: ' + (typeof new Error()));
}

//CHECK#11
if (typeof new RegExp() !== "object") {
  $ERROR('#11: typeof new RegExp() === "object". Actual: ' + (typeof new RegExp()));
}

//CHECK#12
if (typeof RegExp() !== "object") {
  $ERROR('#12: typeof RegExp() === "object". Actual: ' + (typeof RegExp()));
}

