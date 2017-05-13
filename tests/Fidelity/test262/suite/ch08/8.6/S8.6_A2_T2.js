// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Do not crash with postincrement custom property
 *
 * @path ch08/8.6/S8.6_A2_T2.js
 * @description Try to implement postincrement for not declared custom property
 */

var __map={};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!isNaN(__map.foo++)) {
  $ERROR('#1: var __map={}; __map.foo === Not-a-Number. Actual: ' + (__map.foo));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (!("foo" in __map)) {
  $ERROR('#2: var __map={}; "foo" in __map');
}
//
//////////////////////////////////////////////////////////////////////////////

