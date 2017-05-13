// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * MemberExpression calls ToObject(MemberExpression) and ToString(Expression). CallExpression calls ToObject(CallExpression) and ToString(Expression)
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A3_T5.js
 * @description Checking "null" case
 */

//CHECK#1
try {
  null.toString();
  $ERROR('#1.1: null.toString() throw TypeError. Actual: ' + (null.toString()));  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: null.toString() throw TypeError. Actual: ' + (e));  
  }
}

//CHECK#2
try {  
  null["toString"]();
  $ERROR('#2.1: null["toString"]() throw TypeError. Actual: ' + (null["toString"]())); 
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2.2: null["toString"]() throw TypeError. Actual: ' + (e)); 
  }
}

