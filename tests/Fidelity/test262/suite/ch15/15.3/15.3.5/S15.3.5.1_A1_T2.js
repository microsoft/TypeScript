// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the length property is usually an integer that indicates the 'typical' number of arguments expected by the function
 *
 * @path ch15/15.3/15.3.5/S15.3.5.1_A1_T2.js
 * @description Checking length property of Function("arg1,arg2,arg3","arg4,arg5", null)
 */

f = Function("arg1,arg2,arg3","arg4,arg5", null);

//CHECK#1
if (!(f.hasOwnProperty('length'))) {
  $FAIL('#1: the function has length property.');
}

//CHECK#2
if (f.length !== 5) {
  $ERROR('#2: The value of the length property is usually an integer that indicates the "typical" number of arguments expected by the function');
}

