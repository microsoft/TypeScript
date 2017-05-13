// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * toString: If this boolean value is true, then the string "true"
 * is returned, otherwise, this boolean value must be false, and the string
 * "false" is returned
 *
 * @path ch15/15.6/15.6.4/S15.6.4.2_A1_T2.js
 * @description with some argument
 */

//CHECK#1
if(Boolean.prototype.toString(true) !== "false"){
  $ERROR('#1: Boolean.prototype.toString(true) === "false"');
}

//CHECK#2
if((new Boolean()).toString(true) !== "false"){
  $ERROR('#2: (new Boolean()).toString(true) === "false"');
}

//CHECK#3
if((new Boolean(false)).toString(true) !== "false"){
  $ERROR('#3: (new Boolean(false)).toString(true) === "false"');
}

//CHECK#4
if((new Boolean(true)).toString(false) !== "true"){
  $ERROR('#4: (new Boolean(true)).toString(false) === "true"');
}

//CHECK#5
if((new Boolean(1)).toString(false) !== "true"){
  $ERROR('#5: (new Boolean(1)).toString(false) === "true"');
}

//CHECK#6
if((new Boolean(0)).toString(true) !== "false"){
  $ERROR('#6: (new Boolean(0)).toString(true) === "false"');
}

//CHECK#7
if((new Boolean(new Object())).toString(false) !== "true"){
  $ERROR('#7: (new Boolean(new Object())).toString(false) === "true"');
}

