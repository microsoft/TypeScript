// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * [[Call]] executes code associated with the object
 *
 * @path ch08/8.6/8.6.2/S8.6.2_A5_T3.js
 * @description Call function-property of global object, property defined
 *  as knock=function(){count++}
 */

var count=0;
var knock=function(){count++};
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
knock();
if (count !==1) {
  $ERROR('#1: count=0; knock=function(){count++}; knock(); count === 1. Actual: ' + (count));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
this['knock']();
if (count !==2) {
  $ERROR('#2: count=0; knock=function(){count++}; knock(); this[\'knock\'](); count === 2. Actual: ' + (count));
}
//
//////////////////////////////////////////////////////////////////////////////

