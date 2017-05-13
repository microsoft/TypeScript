// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property is created with name callee with property
 * attributes { DontEnum } and no others
 *
 * @path ch10/10.6/S10.6_A3_T3.js
 * @description Checking if deleting arguments.callee property fails
 * @noStrict
 */

//CHECK#1
function f1(){
  return (delete arguments.callee);
}

try{
  if(!f1()){
    $ERROR("#1: A property callee have attribute { DontDelete }");
  }
}
catch(e){
  $ERROR("#1: arguments object don't exists");
}

//CHECK#2
var f2 = function(){
  return (delete arguments.callee);
}

try{
  if(!f2()){
    $ERROR("#2: A property callee have attribute { DontDelete }");
  }
}
catch(e){
  $ERROR("#2: arguments object don't exists");
}

