// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Every function instance has a [[Call]] property
 *
 * @path ch15/15.3/15.3.5/S15.3.5_A2_T2.js
 * @description For testing call (new Function("arg1,arg2","var x =arg1; this.y=arg2;return arg1+arg2;"))("1",2)
 */

//CHECK#1
if ((new Function("arg1,arg2","var x =arg1; this.y=arg2;return arg1+arg2;"))("1",2) !== "12") {
  $ERROR('#1: Every function instance has a [[Call]] property');
}

//CHECK#2
if (typeof x !== "undefined") {
  $ERROR('#2: Every function instance has a [[Call]] property');
}

//CHECK#3
if (y !== 2) {
  $ERROR('#3: Every function instance has a [[Call]] property');
}

