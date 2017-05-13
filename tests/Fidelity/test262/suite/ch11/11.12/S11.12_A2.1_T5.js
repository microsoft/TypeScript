// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x ? y : z uses GetValue
 *
 * @path ch11/11.12/S11.12_A2.1_T5.js
 * @description If ToBoolean(x) is true and GetBase(z) is null, return y
 */

//CHECK#1
var y = new Object();
if ((true ? y : z) !== y) {
  $ERROR('#1: var y = new Object(); (true ? y : z) === y');
}

