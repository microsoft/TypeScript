// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * every function instance has a [[Construct]] property
 *
 * @path ch15/15.3/15.3.5/S15.3.5_A3_T2.js
 * @description As constructor use new Function("arg1,arg2","var x =1; this.y=arg1+arg2;return \"OK\";")
 */

FACTORY = new Function("arg1,arg2","var x =1; this.y=arg1+arg2;return \"OK\";");
obj = new FACTORY("1",2);

//CHECK#1
if (typeof obj !== "object") {
  $ERROR('#1: every function instance has a [[Construct]] property');
}

//CHECK#2
if (obj.constructor !== FACTORY) {
  $ERROR('#2: every function instance has a [[Construct]] property');
}

//CHECK#3
if (obj.y !== "12") {
  $ERROR('#3: every function instance has a [[Construct]] property');
}

