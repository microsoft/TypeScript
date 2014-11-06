// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of evaluating an Identifier is always a value of type Reference
 *
 * @path ch11/11.1/11.1.2/S11.1.2_A1_T2.js
 * @description Trying to generate ReferenceError
 */

//CHECK#1
try {
  this.z;
  z;
  $ERROR('#1.1: this.z; z === undefined throw ReferenceError. Actual: ' + (z));
} catch(e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: this.z; z === undefined throw ReferenceError. Actual: ' + (e));
  }
}

