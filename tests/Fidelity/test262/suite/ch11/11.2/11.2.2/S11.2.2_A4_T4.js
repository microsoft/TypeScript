// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If NewExpression or MemberExpression does not implement internal [[Construct]] method, throw TypeError
 *
 * @path ch11/11.2/11.2.2/S11.2.2_A4_T4.js
 * @description Checking Global object case
 */

//CHECK#1
try {
  new this;
  $ERROR('#1: new this throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1: new this throw TypeError');	
  }
}

//CHECK#2
try {
  new this();
  $ERROR('#2: new this() throw TypeError'); 
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2: new this() throw TypeError'); 
  }
}

