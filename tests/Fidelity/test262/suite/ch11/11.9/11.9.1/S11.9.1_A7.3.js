// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is Boolean and Type(y) is Object,
 * return x == ToPrimitive(y)
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A7.3.js
 * @description y is object, x is primitive boolean
 */

//CHECK#1
if ((true == new Boolean(true)) !== true) {
  $ERROR('#1: (true == new Boolean(true)) === true');
}

//CHECK#2
if ((true == new Number(1)) !== true) {
  $ERROR('#2: (true == new Number(1)) === true');
}

//CHECK#3
if ((true == new String("+1")) !== true) {
  $ERROR('#3: (true == new String("+1")) === true');
}

