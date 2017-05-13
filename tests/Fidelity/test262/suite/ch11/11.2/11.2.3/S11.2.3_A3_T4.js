// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If MemberExpression is not Object, throw TypeError
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A3_T4.js
 * @description Checking "undefined" case
 */

//CHECK#1
try {
  undefined();
    $ERROR('#1.1: undefined() throw TypeError. Actual: ' + (e));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: undefined() throw TypeError. Actual: ' + (e));	
  }
}

//CHECK#2
try {
  var x = undefined;
  x();
    $ERROR('#2.1: var x = undefined; x() throw TypeError. Actual: ' + (e));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2.2: var x = undefined; x() throw TypeError. Actual: ' + (e));	
  }
}

