// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "try" with "catch" or "finally" statement within/without an "if" statement
 *
 * @path ch12/12.14/S12.14_A8.js
 * @description Throwing exception within an "if" statement
 */

// CHECK#1
var c1=1;
try{
  if(c1===1){
    throw "ex1";
    $ERROR('#1.1: throw "ex1" lead to throwing exception');
  }
  $ERROR('#1.2: throw "ex1" inside the "if" statement lead to throwing exception');
}
catch(er1){	
  if (er1!=="ex1") $ERROR('#1.3: Exception ==="ex1". Actual:  Exception ==='+er1);
}

// CHECK#2
var c2=1;
if(c2===1){
  try{
    throw "ex1";
    $ERROR('#2.1: throw "ex1" lead to throwing exception');
  }
  catch(er1){
    if(er1!="ex1") $ERROR('#2.2: Exception ==="ex1". Actual:  Exception ==='+er1);
  }
}

