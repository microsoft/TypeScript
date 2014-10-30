// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property is created with name length with property
 * attributes { DontEnum } and no others
 *
 * @path ch10/10.6/S10.6_A5_T4.js
 * @description Overriding arguments.length property
 */

var str = "something different";
//CHECK#1
function f1(){
  arguments.length = str;
  return arguments;
}

try{
  if(f1().length !== str){
    $ERROR("#1: A property length have attribute { ReadOnly }");
  }
}
catch(e){
  $ERROR("#1: arguments object don't exists");
}

//CHECK#2
var f2 = function(){
    arguments.length = str;
    return arguments;
  };
try{
  if(f2().length !== str){
    $ERROR("#2: A property length have attribute { ReadOnly }");
  }
}
catch(e){
  $ERROR("#2: arguments object don't exists");
}

