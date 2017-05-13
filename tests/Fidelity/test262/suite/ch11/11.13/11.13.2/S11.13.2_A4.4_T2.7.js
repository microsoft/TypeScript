// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production x += y is the same as x = x + y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A4.4_T2.7.js
 * @description Type(x) is different from Type(y) and both types vary between String (primitive or object) and Boolean (primitive and object)
 */

//CHECK#1
x = true;
x += "1";
if (x !== "true1") {
  $ERROR('#1: x = true; x += "1"; x === "true1". Actual: ' + (x));
}

//CHECK#2
x = "1";
x += true;
if (x !== "1true") {
  $ERROR('#2: x = "1"; x += true; x === "1true". Actual: ' + (x));
}

//CHECK#3
x = new Boolean(true);
x += "1";
if (x !== "true1") {
  $ERROR('#3: x = new Boolean(true); x += "1"; x === "true1". Actual: ' + (x));
}

//CHECK#4
x = "1";
x += new Boolean(true);
if (x !== "1true") {
  $ERROR('#4: x = "1"; x += new Boolean(true); x === "1true". Actual: ' + (x));
}

//CHECK#5
x = true;
x += new String("1");
if (x !== "true1") {
  $ERROR('#5: x = true; x += new String("1"); x === "true1". Actual: ' + (x));
}

//CHECK#6
x = new String("1");
x += true;
if (x !== "1true") {
  $ERROR('#6: x = new String("1"); x += true; x === "1true". Actual: ' + (x));
}

//CHECK#7
x = new Boolean(true);
x += new String("1");
if (x !== "true1") {
  $ERROR('#7: x = new Boolean(true); x += new String("1"); x === "true1". Actual: ' + (x));
}

//CHECK#8
x = new String("1");
x += new Boolean(true);
if (x !== "1true") {
  $ERROR('#8: x = new String("1"); x += new Boolean(true); x === "1true". Actual: ' + (x));
}

