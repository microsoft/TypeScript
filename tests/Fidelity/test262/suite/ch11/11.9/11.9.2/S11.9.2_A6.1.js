// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) as well as Type(y) is Undefined or Null, return true
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A6.1.js
 * @description Checking all combinations
 */

//CHECK#1
if ((undefined != undefined) !== false) {
  $ERROR('#1: (undefined != undefined) === false');
}

//CHECK#2
if ((void 0 != undefined) !== false) {
  $ERROR('#2: (void 0 != undefined) === false');
}

//CHECK#3
if ((undefined != eval("var x")) !== false) {
  $ERROR('#3: (undefined != eval("var x")) === false');
}

//CHECK#4
if ((undefined != null) !== false) {
  $ERROR('#4: (undefined != null) === false');
}

//CHECK#5
if ((null != void 0) !== false) {
  $ERROR('#5: (null != void 0) === false');
}

//CHECK#6
if ((null != null) !== false) {
  $ERROR('#6: (null != null) === false');
}

