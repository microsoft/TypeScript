// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property is created with name length with property
 * attributes { DontEnum } and no others
 *
 * @path ch10/10.6/S10.6_A5_T2.js
 * @description Checking if enumerating the arguments.length property fails
 */

//CHECK#1
function f1(){
  for(var x in arguments){
    if (x === "length"){
      return false;
    }
  }
  return true;
}

try{
  if(!f1()){
    $ERROR("#1: A property length don't have attribute { DontEnum }");
  }
}
catch(e){
  $ERROR("#1: arguments object don't exists");
}

//CHECK#2
var f2 = function(){
  for(var x in arguments){
    if (x === "length"){
      return false;
    }
  }
  return true;
}

try{
  if(!f2()){
    $ERROR("#2: A property length don't have attribute { DontEnum }");
  }
}
catch(e){
  $ERROR("#2: arguments object don't exists");
}

