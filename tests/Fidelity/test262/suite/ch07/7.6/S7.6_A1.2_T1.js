// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierStart :: $
 *
 * @path ch07/7.6/S7.6_A1.2_T1.js
 * @description Create variable $
 */

//CHECK#1
var $ = 1;
if ($ !== 1) {
  $ERROR('#1: var $ = 1; $ === 1. Actual: ' + ($));
}

