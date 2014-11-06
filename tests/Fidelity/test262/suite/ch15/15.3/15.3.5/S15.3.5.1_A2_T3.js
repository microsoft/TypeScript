// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * the length property has the attributes { DontDelete }
 *
 * @path ch15/15.3/15.3.5/S15.3.5.1_A2_T3.js
 * @description Checking if deleting the length property of Function("arg1,arg2,arg3","arg1,arg2","arg3", null) fails
 */

f = new Function("arg1,arg2,arg3","arg1,arg2","arg3", null);

//CHECK#1
if (!(f.hasOwnProperty('length'))) {
  $FAIL('#1: the function has length property.');
}

delete f.length;

//CHECK#2
if (!(f.hasOwnProperty('length'))) {
  $ERROR('#2: the function.length property has the attributes DontDelete.');
}

//CHECK#3
if (f.length !== 6) {
  $ERROR('#3: the length property has the attributes { DontDelete }');
}

