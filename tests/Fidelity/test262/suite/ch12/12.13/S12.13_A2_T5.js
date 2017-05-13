// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "throw Expression" returns (throw, GetValue(Result(1)), empty), where 1 evaluates Expression
 *
 * @path ch12/12.13/S12.13_A2_T5.js
 * @description Throwing number
 */

// CHECK#1
try{
  throw 13;
}
catch(e){
  if (e!==13) $ERROR('#1: Exception ===13. Actual:  Exception ==='+ e );
}

// CHECK#2
var b=13;
try{
  throw b;
}
catch(e){
  if (e!==13) $ERROR('#2: Exception ===13. Actual:  Exception ==='+ e );
}

// CHECK#3
try{
  throw 2.13;
}
catch(e){
  if (e!==2.13) $ERROR('#3: Exception ===2.13. Actual:  Exception ==='+ e );
}

// CHECK#4
try{
  throw NaN;
}
catch(e){
  if (!isNaN(e)) $ERROR('#4: Exception is NaN');
}

// CHECK#5
try{
  throw +Infinity;
}
catch(e){
  if (e!==+Infinity) $ERROR('#5: Exception ===+Infinity. Actual:  Exception ==='+ e );
}

// CHECK#6
try{
  throw -Infinity;
}
catch(e){
  if (e!==-Infinity) $ERROR('#6: Exception ===-Infinity. Actual:  Exception ==='+ e );
}

// CHECK#7
try{
  throw +0;
}
catch(e){
  if (e!==+0) $ERROR('#7: Exception ===+0. Actual:  Exception ==='+ e );
}

// CHECK#8
try{
  throw -0;
}
catch(e){
  if (e!==-0) $ERROR('#8: Exception ===-0. Actual:  Exception ==='+ e );
}

