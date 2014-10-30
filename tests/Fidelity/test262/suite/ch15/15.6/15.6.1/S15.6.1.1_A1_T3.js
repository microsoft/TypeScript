// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Returns a boolean value (not a Boolean object) computed by
 * ToBoolean(value)
 *
 * @path ch15/15.6/15.6.1/S15.6.1.1_A1_T3.js
 * @description Used various string values as argument
 */

//CHECK#1
if( typeof Boolean("0") !== "boolean" ) {
  $ERROR('#1.1: typeof Boolean("0") should be "boolean", actual is "'+typeof Boolean("0")+'"');
}
if( Boolean("0") !== true ) {
  $ERROR('#1.2: Boolean("0") should be true');
}

//CHECK#2
if( typeof Boolean("-1") !== "boolean" ) {
  $ERROR('#2.1: typeof Boolean("-1") should be "boolean", actual is "'+typeof Boolean("-1")+'"');
}
if( Boolean("-1") !== true ) {
  $ERROR('#2.2: Boolean("-1") should be true');
}

//CHECK#3
if( typeof Boolean("1") !== "boolean" ) {
  $ERROR('#3.1: typeof Boolean("1") should be "boolean", actual is "'+typeof Boolean("1")+'"');
}
if( Boolean("1") !== true ) {
  $ERROR('#3.2: Boolean("1") should be true');
}

//CHECK#4
if( typeof Boolean("false") !== "boolean" ) {
  $ERROR('#4.1: typeof Boolean("false") should be "boolean", actual is "'+typeof Boolean("false")+'"');
}
if( Boolean("false") !== true ) {
  $ERROR('#4.2: Boolean("false") should be true');
}

//CHECK#5
if( typeof Boolean("true") !== "boolean" ) {
  $ERROR('#5.1: typeof Boolean("true") should be "boolean", actual is "'+typeof Boolean("true")+'"');
}
if( Boolean("true") !== true ) {
  $ERROR('#5.2: Boolean("true") should be true');
}

