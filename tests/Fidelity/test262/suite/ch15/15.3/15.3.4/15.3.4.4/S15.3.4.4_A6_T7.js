// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs
 * a function call using the [[Call]] property of the object
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A6_T7.js
 * @description Argunemts of call function is (null, arguments,"",2), inside function call without declaration used
 */

(function (){
  Function("a1,a2,a3","this.shifted=a1.length+a2+a3;").call(null,arguments,"",2);
})("",1,2,true);

//CHECK#1
if (this["shifted"] !== "42") {
  $ERROR('#1: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}

