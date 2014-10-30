// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * x++ calls GetValue then PutValue so after applying postfix increment(actually conrete operator type is unimportant)
 * we must have reference to defined value
 *
 * @path ch08/8.7/S8.7.2_A2.js
 * @description Execute x++, where x is var x
 */

var x;
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (x !== undefined) {
  $ERROR('#1: var x; x === undefined. Actual: ' + (x));
}
//
//////////////////////////////////////////////////////////////////////////////
x++;
//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (x === undefined) {
  $ERROR('#2: var x; x++; x !== undefined');
}
//
//////////////////////////////////////////////////////////////////////////////

