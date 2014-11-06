// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator !x returns !ToBoolean(x)
 *
 * @path ch11/11.4/11.4.9/S11.4.9_A3_T5.js
 * @description Type(x) is Object object or Function object
 */

//CHECK#1
if ((!{}) !== false) {
  $ERROR('#1: !({}) === false');
}

//CHECK#2  
if (!(function(){return 1}) !== false) {
  $ERROR('#2: !(function(){return 1}) === false');
}

