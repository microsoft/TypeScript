// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Catching objects with try/catch/finally statement
 *
 * @path ch12/12.14/S12.14_A18_T5.js
 * @description Catching Number
 */

// CHECK#1
try{
  throw 13;
}
catch(e){
  if (e!==13) $ERROR('#1: Exception ===13. Actual:  Exception ==='+ e  );
}

// CHECK#2
try{
  throw 10+3;
}
catch(e){
  if (e!==13) $ERROR('#2: Exception ===13. Actual:  Exception ==='+ e  );
}

// CHECK#3
var b=13;
try{
  throw b;
}
catch(e){
  if (e!==13) $ERROR('#3: Exception ===13. Actual:  Exception ==='+ e  );
}

// CHECK#4
var a=3;
var b=10;
try{
  throw a+b;
}
catch(e){
  if (e!==13) $ERROR('#4: Exception ===13. Actual:  Exception ==='+ e  );
}

// CHECK#5
try{
  throw 2.13;
}
catch(e){
  if (e!==2.13) $ERROR('#5: Exception ===2.13. Actual:  Exception ==='+ e  );
}

// CHECK#6
var ex=2/3;
try{
  throw 2/3;
}
catch(e){
  if (e!==ex) $ERROR('#6: Exception ===2/3. Actual:  Exception ==='+ e  );
}

// CHECK#7
try{
  throw NaN;
}
catch(e){
  if (!isNaN(e)) $ERROR('#7: Exception is NaN');
}

// CHECK#8
try{
  throw +Infinity;
}
catch(e){
  if (e!==+Infinity) $ERROR('#8: Exception ===+Infinity. Actual:  Exception ==='+ e  );
}

// CHECK#9
try{
  throw -Infinity;
}
catch(e){
  if (e!==-Infinity) $ERROR('#9: Exception ===-Infinity. Actual:  Exception ==='+ e  );
}

// CHECK#10
try{
  throw +0;
}
catch(e){
  if (e!==+0) $ERROR('#10: Exception ===+0. Actual:  Exception ==='+ e  );
}

// CHECK#11
try{
  throw -0;
}
catch(e){
  if (e!==-0) $ERROR('#11: Exception ===-0. Actual:  Exception ==='+ e  );
}

