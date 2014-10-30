// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs
 * a function call using the [[Call]] property of the object
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A6_T3.js
 * @description Argunemts of call function is (empty object, new Array("nine","inch","nails"))
 */

var i=0;

var p={toString:function(){return "a"+(++i);}};

var obj={};

Function(p,"a2,a3","this.shifted=a1;").call(obj, new Array("nine","inch","nails"));

//CHECK#1
if (obj["shifted"].length !== 3) {
  $ERROR('#1: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}

//CHECK#2
if ((obj["shifted"][0] !== "nine")||(obj["shifted"][1] !== "inch")||(obj["shifted"][2] !== "nails")) {
  $ERROR('#2: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}

//CHECK#3
if (typeof this["shifted"] !== "undefined") {
  $ERROR('#3: The call method takes one or more arguments, thisArg and (optionally) arg1, arg2 etc, and performs a function call using the [[Call]] property of the object');
}


