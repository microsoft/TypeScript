// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function declaration in function code - If the variable object
 * already has a property with the name of Function Identifier, replace its
 * value and attributes. Semantically, this step must follow the creation of
 * FormalParameterList properties
 *
 * @path ch10/10.2/10.2.1/S10.2.1_A4_T2.js
 * @description Checking existence of a function with declared variable
 */

//CHECK#1
function f1(){
  var x;
  
  return x;
  
  function x(){
    return 7;
  }
}
if(!(f1().constructor.prototype === Function.prototype)){
  $PRINT('#1: f1() returns function');
}

//CHECK#2
function f2(){
  var x;
  
  return typeof x;
  
  function x(){
    return 7;
  }
}
if(!(f2() === "function")){
  $PRINT('#2: f2() === "function"');
}

