// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs
 * a function call using the [[Call]] property of the object
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A6_T2.js
 * @description Argunemts of call function is (null,[3,2,1])
 */

new Function("a1,a2","a3","this.shifted=a1;").call(null,[3,2,1]);

//CHECK#1
if (this["shifted"].length !== 3) {
  $ERROR('#1: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}

//CHECK#2
if ((this["shifted"][0] !== 3)||(this["shifted"][1] !== 2)||(this["shifted"][2] !== 1)) {
  $ERROR('#2: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}


