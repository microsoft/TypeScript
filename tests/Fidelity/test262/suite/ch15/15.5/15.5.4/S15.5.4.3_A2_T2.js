// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The valueOf function is not generic; it throws a TypeError exception if its this value is not a String object.
 * Therefore, it cannot be transferred to other kinds of objects for use as a method
 *
 * @path ch15/15.5/15.5.4/S15.5.4.3_A2_T2.js
 * @description Checking if creating the object String.prototype.valueOf fails
 */

var __obj={valueOf : String.prototype.valueOf};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __obj["valueOf"] !== "function") {
  $ERROR('#1: var __obj={valueOf : String.prototype.valueOf}; typeof __obj["valueOf"] === "function". Actual: typeof __obj["valueOf"] ==='+typeof __obj["valueOf"] ); 
}

//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
try {
  var x = (__obj == 1);
  $FAIL('#2: "var __obj={valueOf : String.prototype.valueOf}; var x = (__obj == 1)" lead to throwing exception');
} catch (e) {
  if (!(e instanceof TypeError)) {
    $ERROR('#2.1: Exception is instance of TypeError. Actual: exception is '+e);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

