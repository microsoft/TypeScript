// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(NewExpression) or Type(MemberExpression) is not Object, throw TypeError
 *
 * @path ch11/11.2/11.2.2/S11.2.2_A3_T3.js
 * @description Checking "string primitive" case
 */

//CHECK#1
try {
  new 1;
  $ERROR('#1: new "1" throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1: new "1" throw TypeError');	
  }
}

//CHECK#2
try {
  var x = "1";
  new x;
  $ERROR('#2: var x = "1"; new x throw TypeError');	
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2: var x = "1"; new x throw TypeError');	
  }
}

//CHECK#3
try {
  var x = "1";
  new x();
  $ERROR('#3: var x = "1"; new x() throw TypeError'); 
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#3: var x = "1"; new x() throw TypeError'); 
  }
}

