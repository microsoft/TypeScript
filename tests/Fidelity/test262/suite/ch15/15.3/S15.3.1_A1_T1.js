// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The function call Function(…) is equivalent to the object creation expression
 * new Function(…) with the same arguments.
 *
 * @path ch15/15.3/S15.3.1_A1_T1.js
 * @description Create simple functions and check returned values
 */

var f = Function("return arguments[0];");

//CHECK#1
if (!(f instanceof Function)){
  $ERROR('#1: f instanceof Function');
}

//CHECK#2
if (f(1) !== 1) {
  $ERROR('#2: f(1) !== 1');
}

var g = new Function("return arguments[0];");


//CHECK#3
if (!(g instanceof Function)) {
  $ERROR('#3: g instanceof Function');
}

//CHECK#4
if (g("A") !== "A") {
  $ERROR('#4: g("A") !== "A"');
}

//CHECK#5
if (g("A") !== f("A")) {
  $ERROR('#5: g("A") !== f("A")');
}

