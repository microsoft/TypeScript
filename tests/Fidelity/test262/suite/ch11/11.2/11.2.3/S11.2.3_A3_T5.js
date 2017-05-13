// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If MemberExpression is not Object, throw TypeError
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A3_T5.js
 * @description Checking "null" case
 */

//CHECK#1
try {
  null();
    $ERROR('#1.1: null() throw TypeError. Actual: ' + (null()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: null() throw TypeError. Actual: ' + (e));	
  }
}

//CHECK#2
try {
  var x = null;
  x();
    $ERROR('#2.1: var x = null; x() throw TypeError. Actual: ' + (x()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2.2: var x = null; x() throw TypeError. Actual: ' + (e));	
  }
}

