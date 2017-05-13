// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The toString function is not generic; it throws a TypeError exception if its this value is not a String object. Therefore, it cannot be transferred to other kinds of objects for use as a method
 *
 * @path ch15/15.5/15.5.4/S15.5.4.2_A2_T1.js
 * @description Checking if creating variable String.prototype.toString fails
 */

var __toString = String.prototype.toString;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __toString !== "function") {
  $ERROR('#1: __toString = String.prototype.toString; typeof __toString === "function". Actual: typeof __toString ==='+typeof __toString ); 
}

//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
  var x = __toString();
  $FAIL('#2: "__toString = String.prototype.toString; var x = __toString();" lead to throwing exception');
} catch (e) {
  if (!(e instanceof TypeError)) {
    $ERROR('#2.1: "__toString = String.prototype.toString; var x = __toString();" lead to throwing exception. Exception is instance of TypeError. Actual: exception is '+e);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

