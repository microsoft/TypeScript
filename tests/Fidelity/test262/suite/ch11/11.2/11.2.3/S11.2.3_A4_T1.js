// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If MemberExpression does not implement the internal [[Call]] method, throw TypeError
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A4_T1.js
 * @description Checking Boolean object case
 */

//CHECK#1
try {
  new Boolean(true)();
  $ERROR('#1.1: new Boolean(true)() throw TypeError. Actual: ' + (new Boolean(true)()));  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: new Boolean(true)() throw TypeError. Actual: ' + (e));  
  }
}

//CHECK#2
try {
  var x = new Boolean(true);
  x();
  $ERROR('#2.1: var x = new Boolean(true); x() throw TypeError. Actual: ' + (x()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2.2: var x = new Boolean(true); x() throw TypeError. Actual: ' + (e));	
  }
}


