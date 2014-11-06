// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result(3).type is not normal, then Result(3).type must be throw.
 * Throw Result(3).value as an exception
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A3.3_T3.js
 * @description Return statement
 */

//CHECK#1
try {
  eval("return;");
  $ERROR('#1.1: return must throw SyntaxError. Actual: ' + (eval("return;")));
} catch(e) {
  if ((e instanceof SyntaxError) !== true) {
    $ERROR('#1.2: return must throw SyntaxError. Actual: ' + (e));
  }  
}

//CHECK#2

function f() {  eval("return;"); };

try {
  f();      
  $ERROR('#2.1: return must throw SyntaxError. Actual: ' + (f()));
} catch(e) {
  if ((e instanceof SyntaxError) !== true) {
    $ERROR('#2.2: return must throw SyntaxError. Actual: ' + (e));
  }  
}      

