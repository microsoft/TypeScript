// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the value of this last parameter (which has the same
 * name as some previous parameters do) was not supplied by the
 * caller, the value of the corresponding property is undefined
 *
 * @path ch10/10.2/10.2.1/S10.2.1_A3.js
 * @description Creating functions with two or more formal parameters,
 * that have the same name. Calling this function excluding a few last parameters
 */

//CHECK#1
function f1(x, a, b, x){
  return x;
}
if(!(f1(1, 2) === undefined)){
  $ERROR('#1: f1(1, 2) === undefined');
}

