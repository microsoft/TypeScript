// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production TryStatement : try Block Catch is evaluated as follows: 2. If Result(1).type is not throw, return Result(1)
 *
 * @path ch12/12.14/S12.14_A1.js
 * @description Executing TryStatement : try Block Catch. The statements doesn't cause actual exceptions
 */

// CHECK#1
try {
  var x=0;
}
catch (e) {
  $ERROR('#1: If Result(1).type is not throw, return Result(1). Actual: 4 Return(Result(3))');
}

// CHECK#2
var c1=0;
try{
  var x1=1;
}
finally
{
  c1=1;
}
if(x1!==1){
  $ERROR('#2.1: "try" block must be evaluated. Actual: try Block has not been evaluated');
}
if (c1!==1){
  $ERROR('#2.2: "finally" block must be evaluated. Actual: finally Block has not been evaluated');
}

// CHECK#3
var c2=0;
try{
  var x2=1;
}
catch(e){
  $ERROR('#3.1: If Result(1).type is not throw, return Result(1). Actual: 4 Return(Result(3))');	
}
finally{
  c2=1;
}
if(x2!==1){
  $ERROR('#3.2: "try" block must be evaluated. Actual: try Block has not been evaluated');
}
if (c2!==1){
  $ERROR('#3.3: "finally" block must be evaluated. Actual: finally Block has not been evaluated');
}

