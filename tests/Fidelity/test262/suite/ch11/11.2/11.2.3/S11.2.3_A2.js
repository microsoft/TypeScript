// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CallExpression : MemberExpression Arguments uses GetValue
 *
 * @path ch11/11.2/11.2.3/S11.2.3_A2.js
 * @description If GetBase(MemberExpression) is null, throw ReferenceError
 */

//CHECK#1
try {
  x();
  $ERROR('#1.1: x() throw ReferenceError. Actual: ' + (x()));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: x() throw ReferenceError. Actual: ' + (e));  
  }
}

//CHECK#2
try {
  x(1,2,3);
  $ERROR('#2.1: x(1,2,3) throw ReferenceError. Actual: ' + (x(1,2,3))); 
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#2.2: x(1,2,3) throw ReferenceError. Actual: ' + (e)); 
  }
}

