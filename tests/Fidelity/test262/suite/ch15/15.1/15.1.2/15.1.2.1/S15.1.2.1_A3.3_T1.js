// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Result(3).type is not normal, then Result(3).type must be throw.
 * Throw Result(3).value as an exception
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A3.3_T1.js
 * @description Continue statement
 */

//CHECK#1
try {
  eval("continue;");
  $ERROR('#1.1: continue must throw SyntaxError. Actual: ' + (eval("continue;")));
} catch(e) {
  if ((e instanceof SyntaxError) !== true) {
    $ERROR('#1.2: continue must throw SyntaxError. Actual ' + (e));
  }  
}

//CHECK#2
try {
  for (var i = 0; i <= 1; i++) {
    for (var j = 0; j <= 1; j++) {
       eval("continue;");       
    }
  }
  $ERROR('#2.1: continue must throw SyntaxError. Actual: ' + (eval("continue;")));    
} catch(e) {
  if ((e instanceof SyntaxError) !== true) {
    $ERROR('#2.2: continue must throw SyntaxError. Actual: ' + (e));
  }  
}      

