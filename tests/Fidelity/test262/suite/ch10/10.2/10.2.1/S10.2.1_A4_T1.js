// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function declaration in function code - If the variable object
 * already has a property with the name of Function Identifier, replace its
 * value and attributes. Semantically, this step must follow the creation of
 * FormalParameterList properties
 *
 * @path ch10/10.2/10.2.1/S10.2.1_A4_T1.js
 * @description Checking existence of a function with passed parameter
 * @noStrict
 */

//CHECK#1
function f1(x){
  return x;

  function x(){
    return 7;
  }
}
if(!(f1().constructor.prototype === Function.prototype)){
  $ERROR('#1: f1() returns function');
}

//CHECK#2
function f2(x){
  return typeof x;

  function x(){
    return 7;
  }
}
if(!(f2() === "function")){
  $ERROR('#2: f2() === "function"');
}

//CHECK#3
function f3() {
  return typeof arguments;
  function arguments() {
    return 7;
  }
}
if (!(f3() === "function")){
  $ERROR('#3: f3() === "function"');
}

