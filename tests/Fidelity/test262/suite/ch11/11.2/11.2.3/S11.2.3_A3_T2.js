// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If MemberExpression is not Object, throw TypeError
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A3_T2.js
 * @description Checking "number primitive" case
 */

//CHECK#1
try {
  1();
    $ERROR('#1.1: 1() throw TypeError. Actual: ' + (1()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: 1() throw TypeError. Actual: ' + (e));	
  }
}

//CHECK#2
try {
  var x = 1;
  x();
    $ERROR('#2.1: var x = 1; x() throw TypeError. Actual: ' + (x()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2.2: var x = 1; x() throw TypeError. Actual: ' + (e));	
  }
}

