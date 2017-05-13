// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is String and Type(y) is Object,
 * return x != ToPrimitive(y)
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A7.7.js
 * @description y is object, x is primitive string
 */

//CHECK#1
if (("1" != new Boolean(true)) !== false) {
  $ERROR('#1: ("1" != new Boolean(true)) === false');
}

//CHECK#2
if (("-1" != new Number(-1)) !== false) {
  $ERROR('#2: ("-1" != new Number(-1)) === false');
}

//CHECK#3
if (("x" != new String("x")) !== false) {
  $ERROR('#3: ("x" != new String("x")) === false');
}

