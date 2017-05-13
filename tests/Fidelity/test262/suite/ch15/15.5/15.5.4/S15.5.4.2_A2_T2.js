// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The toString function is not generic; it throws a TypeError exception if its this value is not a String object. Therefore, it cannot be transferred to other kinds of objects for use as a method
 *
 * @path ch15/15.5/15.5.4/S15.5.4.2_A2_T2.js
 * @description Checking if creating the object String.prototype.toString fails
 */

var __obj={toString : String.prototype.toString};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __obj["toString"] !== "function") {
  $ERROR('#1: var __obj={toString : String.prototype.toString}; typeof __obj["toString"] === "function". Actual: typeof __obj["toString"] ==='+typeof __obj["toString"] ); 
}

//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
  var x = (__obj == 1);
  $FAIL('#2: "var x = (__obj == 1)" lead to throwing exception');
} catch (e) {
  if (!(e instanceof TypeError)) {
    $ERROR('#2.1: Exception is instance of TypeError. Actual: exception is '+e);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

