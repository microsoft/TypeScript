// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ShiftExpression is not an object, throw TypeError
 *
 * @path ch11/11.8/11.8.7/S11.8.7_A3.js
 * @description Checking all the types of primitives
 */

//CHECK#1
try {
  "toString" in true;
  $ERROR('#1: "toString" in true throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1: "toString" in true throw TypeError');  
  }
}

//CHECK#2
try {
  "MAX_VALUE" in 1;
  $ERROR('#2: "MAX_VALUE" in 1 throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#2: "MAX_VALUE" in 1 throw TypeError');  
  }
}

//CHECK#3
try {
  "length" in "string";
  $ERROR('#3: "length" in "string" throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#3: "length" in "string" throw TypeError');  
  }
}

//CHECK#4
try {
  "toString" in undefined;
  $ERROR('#4: "toString" in undefined throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#4: "toString" in undefined throw TypeError');  
  }
}

//CHECK#5
try {
  "toString" in null;
  $ERROR('#5: "toString" in null throw TypeError');  
}
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#5: "toString" in null throw TypeError');  
  }
}

