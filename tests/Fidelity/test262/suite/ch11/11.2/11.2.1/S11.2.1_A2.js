// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * MemberExpression and CallExpression uses GetValue
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A2.js
 * @description If GetBase(MemberExpression or CallExpression) is null, throw ReferenceError
 */

//CHECK#1
try {
  object[1];
  $ERROR('#1.1: object[1] throw ReferenceError. Actual: ' + (object[1]));  
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#1.2: object[1] throw ReferenceError. Actual: ' + (e));  
  }
}

//CHECK#2
try {
  object.prop;
  $ERROR('#2.1: object.prop throw ReferenceError. Actual: ' + (object.prop)); 
}
catch (e) {
  if ((e instanceof ReferenceError) !== true) {
    $ERROR('#2.2: object.prop throw ReferenceError. Actual: ' + (e)); 
  }
}

