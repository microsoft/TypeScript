// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Returns a boolean value (not a Boolean object) computed by
 * ToBoolean(value)
 *
 * @path ch15/15.6/15.6.1/S15.6.1.1_A1_T5.js
 * @description Used various assigning values to any variable as argument
 */

//CHECK#1
if( typeof Boolean(x=0) !== "boolean" ) {
  $ERROR('#1.1: typeof Boolean(x=0) should be "boolean", actual is "'+typeof Boolean(x=0)+'"');
}
if( Boolean(x=0) !== false ) {
  $ERROR('#1.2: Boolean(x=0) should be false');
}

//CHECK#2
if( typeof Boolean(x=1) !== "boolean" ) {
  $ERROR('#2.1: typeof Boolean(x=1) should be "boolean", actual is "'+typeof Boolean(x=1)+'"');
}
if( Boolean(x=1) !== true ) {
  $ERROR('#2.2: Boolean(x=1) should be true');
}

//CHECK#3
if( typeof Boolean(x=false) !== "boolean" ) {
  $ERROR('#3.1: typeof Boolean(x=false) should be "boolean", actual is "'+typeof Boolean(x=false)+'"');
}
if( Boolean(x=false) !== false ) {
  $ERROR('#3.2: Boolean(x=false) should be false');
}

//CHECK#4
if( typeof Boolean(x=true) !== "boolean" ) {
  $ERROR('#4.1: typeof Boolean(x=true) should be "boolean", actual is "'+typeof Boolean(x=true)+'"');
}
if( Boolean(x=true) !== true ) {
  $ERROR('#4.2: Boolean(x=true) should be true');
}

//CHECK#5
if( typeof Boolean(x=null) !== "boolean" ) {
  $ERROR('#5.1: typeof Boolean(x=null) should be "boolean", actual is "'+typeof Boolean(x=null)+'"');
}
if( Boolean(x=null) !== false ) {
  $ERROR('#5.2: Boolean(x=null) should be false');
}

