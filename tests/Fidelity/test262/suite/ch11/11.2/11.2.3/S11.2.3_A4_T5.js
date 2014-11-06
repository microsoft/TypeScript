// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If MemberExpression does not implement the internal [[Call]] method, throw TypeError
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A4_T5.js
 * @description Checking Math object case
 */

//CHECK#1
try {
  Math();
  $ERROR('#1.1: Math() throw TypeError. Actual: ' + (Math()));	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: Math() throw TypeError. Actual: ' + (e));	
  }
}


