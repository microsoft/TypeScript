// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the
 * created arguments object is the original Object prototype object, the one
 * that is the initial value of Object.prototype
 *
 * @path ch10/10.6/S10.6_A2.js
 * @description Checking arguments.constructor.prototype===Object.prototype
 */

//CHECK#1
function f1(){
  return arguments.constructor.prototype;
}
try{
  if(f1() !== Object.prototype){
    $ERROR('#1: arguments.constructor.prototype === Object.prototype');
  }
}
catch(e){
  $ERROR("#1: arguments doesn't exists");
}

//CHECK#2
var f2 = function(){return arguments.constructor.prototype;};
try{
  if(f2() !== Object.prototype){
    $ERROR('#2: arguments.constructor.prototype === Object.prototype');
  }
}
catch(e){
  $ERROR("#2: arguments doesn't exists");
}

