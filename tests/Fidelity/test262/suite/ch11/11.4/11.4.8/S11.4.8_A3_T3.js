// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ~x returns ~ToInt32(x)
 *
 * @path ch11/11.4/11.4.8/S11.4.8_A3_T3.js
 * @description Type(x) is string primitive or String object
 */

//CHECK#1
if (~"1" !== -2) {
  $ERROR('#1: ~"1" === -2. Actual: ' + (~"1"));
}

//CHECK#2
if (~new String("0") !== -1) {
  $ERROR('#2: ~new String("0") === -1. Actual: ' + (~new String("0")));
}

//CHECK#3
if (~"x" !== -1) {
  $ERROR('#3: ~"x" === -1. Actual: ' + (~"x"));
}

//CHECK#4
if (~"" !== -1) {
  $ERROR('#4: ~"" === -1. Actual: ' + (~""));
}

//CHECK#5
if (~new String("-2") !== 1) {
  $ERROR('#5: ~new String("-2") === 1. Actual: ' + (~new String("-2")));
}

