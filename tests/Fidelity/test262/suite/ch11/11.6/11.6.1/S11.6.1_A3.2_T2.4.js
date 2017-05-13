// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(Primitive(x)) is String or Type(Primitive(y)) is String, then operator x + y returns the result of concatenating ToString(x) followed by ToString(y)
 *
 * @path ch11/11.6/11.6.1/S11.6.1_A3.2_T2.4.js
 * @description Type(Primitive(x)) is different from Type(Primitive(y)) and both types vary between String (primitive or object) and Null
 */

//CHECK#1
if ("1" + null !== "1null") {
  $ERROR('#1: "1" + null === "1null". Actual: ' + ("1" + null));
}

//CHECK#2
if (null + "1" !== "null1") {
  $ERROR('#2: null + "1" === "null1". Actual: ' + (null + "1"));
}

//CHECK#3
if (new String("1") + null !== "1null") {
  $ERROR('#3: new String("1") + null === "1null". Actual: ' + (new String("1") + null));
}

//CHECK#4
if (null + new String("1") !== "null1") {
  $ERROR('#4: null + new String("1") === "null1". Actual: ' + (null + new String("1")));
}

