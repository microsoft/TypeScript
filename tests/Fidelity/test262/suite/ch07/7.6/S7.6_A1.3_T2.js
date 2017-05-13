// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierStart :: _
 *
 * @path ch07/7.6/S7.6_A1.3_T2.js
 * @description The _ as unicode character \u005F
 */

//CHECK#1
var \u005F = 1;
if (_ !== 1) {
  $ERROR('#1: var \\u005F = 1; _ === 1. Actual: ' + (_));
}

