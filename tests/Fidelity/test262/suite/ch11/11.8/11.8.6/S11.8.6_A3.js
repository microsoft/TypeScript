// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ShiftExpression is not an object, throw TypeError
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A3.js
 * @description Checking all the types of primitives
 */

//CHECK#1
try {
  true instanceof true;
  $ERROR('#1: true instanceof true throw TypeError');  
}
catch (e) {
  if (e instanceof TypeError !== true) {
    $ERROR('#1: true instanceof true throw TypeError');  
  }
}

//CHECK#2
try {
  1 instanceof 1;
  $ERROR('#2: 1 instanceof 1 throw TypeError');  
}
catch (e) {
  if (e instanceof TypeError !== true) {
    $ERROR('#2: 1 instanceof 1 throw TypeError');  
  }
}

//CHECK#3
try {
  "string" instanceof "string";
  $ERROR('#3: "string" instanceof "string" throw TypeError');  
}
catch (e) {
  if (e instanceof TypeError !== true) {
    $ERROR('#3: "string" instanceof "string" throw TypeError');  
  }
}

//CHECK#4
try {
  undefined instanceof undefined;
  $ERROR('#4: undefined instanceof undefined throw TypeError');  
}
catch (e) {
  if (e instanceof TypeError !== true) {
    $ERROR('#4: undefined instanceof undefined throw TypeError');  
  }
}

//CHECK#5
try {
  null instanceof null;
  $ERROR('#5: null instanceof null throw TypeError');  
}
catch (e) {
  if (e instanceof TypeError !== true) {
    $ERROR('#5: null instanceof null throw TypeError');  
  }
}

