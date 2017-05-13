// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Only Function objects implement [[HasInstance]] and can be proper ShiftExpression for the "instanceof" operator consequently
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A6_T1.js
 * @description Checking "this" case
 */

//CHECK#1
try{
	({}) instanceof this;
	$ERROR('#1: Only Function objects implement [[HasInstance]] and consequently can be proper ShiftExpression for The instanceof operator');
}
catch(e){
  if (e instanceof TypeError !== true) {
    $ERROR('#1: Only Function objects implement [[HasInstance]] and consequently can be proper ShiftExpression for The instanceof operator');
  }
}

