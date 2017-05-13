// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is different from Type(y), return true
 *
 * @path ch11/11.9/11.9.5/S11.9.5_A8_T5.js
 * @description Checking such x and y that either x or y is primitive string and the other is primitive number
 */

//CHECK#1
try {
  throw 1;
} catch(e) {
  if (!(e !== "1")) {
    $ERROR('#1: throw 1 !== "1"');
  }
}

//CHECK#2
try {
  throw "1";
} catch(e) {
  if (!(1 !== e)) {
    $ERROR('#2: 1 !== throw "1"');
  }
} 

