// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Using "try" with "catch" or "finally" statement within/without a "while" statement
 *
 * @path ch12/12.14/S12.14_A10_T1.js
 * @description Throwing exception while executing iteration statement placed into try Block
 */

// CHECK#1
var i=0;
try{
while(i<10){
  if(i===5) throw i;
  i++;
}
}
catch(e){
  if(e!==5)$ERROR('#1: Exception === 5. Actual:  Exception ==='+ e  );
}

