// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return x
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A4_T3.js
 * @description Type(x) and Type(y) vary between primitive string and String object
 */

//CHECK#1
if (("-1" || "1") !== "-1") {
  $ERROR('#-1: ("-1" || "1") === "-1"');
}

//CHECK#2
if (("-1" || "x") !== "-1") {
  $ERROR('#2: ("-1" || "x") === "-1"');
}

//CHECK#3
var x = new String("-1");
if ((x || new String(-1)) !== x) {
  $ERROR('#3: (var x = new String("-1"); (x || new String(-1)) === x');
}

//CHECK#4
var x = new String(NaN);
if ((x || new String("1")) !== x) {
  $ERROR('#4: (var x = new String(NaN); (x || new String("1")) === x');
}

//CHECK#5
var x = new String("-x");
if ((x || new String("x")) !== x) {
  $ERROR('#5: (var x = new String("-x"); (x || new String("x")) === x');
}

//CHECK#6
var x = new String(0);
if ((x || new String(NaN)) !== x) {
  $ERROR('#6: (var x = new String(0); (x || new String(NaN)) === x');
}

