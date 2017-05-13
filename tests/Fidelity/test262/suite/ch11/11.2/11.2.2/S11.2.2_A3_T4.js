// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(NewExpression) or Type(MemberExpression) is not Object, throw TypeError
 *
 * @path ch11/11.2/11.2.2/S11.2.2_A3_T4.js
 * @description Checking "undefined" case
 */

//CHECK#1
try {
  new undefined;
  $ERROR('#1: new undefined throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1: new undefined throw TypeError');	
  }
}

//CHECK#2
try {
  var x = undefined;
  new x;
  $ERROR('#2: var x = undefined; new x throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2: var x = undefined; new x throw TypeError');	
  }
}

//CHECK#3
try {
  var x = undefined;
  new x();
  $ERROR('#3: var x = undefined; new x() throw TypeError'); 
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#3: var x = undefined; new x() throw TypeError'); 
  }
}

