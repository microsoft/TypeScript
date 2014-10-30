// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Returns a boolean value (not a Boolean object) computed by
 * ToBoolean(value)
 *
 * @path ch15/15.6/15.6.1/S15.6.1.1_A1_T4.js
 * @description Used various undefined values and null as argument
 */

//CHECK#1
if( typeof Boolean(undefined) !== "boolean" ) {
  $ERROR('#1.1: typeof Boolean(undefined) should be "boolean", actual is "'+typeof Boolean(undefined)+'"');
}
if( Boolean(undefined) !== false ) {
  $ERROR('#1.2: Boolean(undefined) should be false');
}

//CHECK#2
if( typeof Boolean(void 0) !== "boolean" ) {
  $ERROR('#2.1: typeof Boolean(void 0) should be "boolean", actual is "'+typeof Boolean(void 0)+'"');
}
if( Boolean(void 0) !== false ) {
  $ERROR('#2.2: Boolean(void 0) should be false');
}

//CHECK#3
if( typeof Boolean(function(){}()) !== "boolean" ) {
  $ERROR('#3.1: typeof Boolean(function(){}()) should be "boolean", actual is "'+typeof Boolean(function(){}())+'"');
}
if( Boolean(function(){}()) !== false ) {
  $ERROR('#3.2: Boolean(function(){}()) should be false');
}

//CHECK#4
if( typeof Boolean(null) !== "boolean" ) {
  $ERROR('#4.1: typeof Boolean(null) should be "boolean", actual is "'+typeof Boolean(null)+'"');
}
if( Boolean(null) !== false ) {
  $ERROR('#4.2: Boolean(null) should be false');
}

//CHECK#5
if( typeof Boolean(x) !== "boolean" ) {
  $ERROR('#5.1: var x; typeof Boolean(x) should be "boolean", actual is "'+typeof Boolean(x)+'"');
}
if( Boolean(x) !== false ) {
  $ERROR('#5.2: var x; Boolean(x) should be false');
}
var x;

