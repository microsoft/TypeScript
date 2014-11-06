// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "throw Expression" returns (throw, GetValue(Result(1)), empty), where 1 evaluates Expression
 *
 * @path ch12/12.13/S12.13_A2_T1.js
 * @description Throwing undefined
 */

// CHECK#1
try{
  throw undefined;
}
catch(e){
  if (e!==undefined) $ERROR('#1: Exception === undefined. Actual:  Exception ==='+ e  );
}

