// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * match returns array as specified in 15.10.6.2
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A2_T18.js
 * @description Regular expression is /0./.
 * And regular expression object have property lastIndex = 0
 */

var __re = /0./;

__re.lastIndex = 0;

var __num = 10203040506070809000;

Number.prototype.match = String.prototype.match;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__num.match(__re)[0]!== "02") {
  $ERROR('#1: __num.match(__re)[0]=== "02". Actual: '+__num.match(__re)[0]);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__num.match(__re).length !==1) {
  $ERROR('#2: __num.match(__re).length ===1. Actual: '+__num.match(__re).length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__num.match(__re).index !==1) {
  $ERROR('#3: __num.match(__re).index ===1. Actual: '+__num.match(__re).index );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__num.match(__re).input !==String(__num)) {
  $ERROR('#4: __num.match(__re).input ===String(__num). Actual: '+__num.match(__re).input );
}
//
//////////////////////////////////////////////////////////////////////////////

