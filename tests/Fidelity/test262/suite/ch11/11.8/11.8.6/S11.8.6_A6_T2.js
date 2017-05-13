// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Only Function objects implement [[HasInstance]] and can be proper ShiftExpression for the "instanceof" operator consequently
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A6_T2.js
 * @description Checking Math case
 */

//CHECK#1
try{
	1 instanceof Math;
	$ERROR('#1: 1 instanceof Math throw TypeError');
}
catch(e){
  if (e  instanceof TypeError !== true) { 
    $ERROR('#1: 1 instanceof Math throw TypeError');
  }  
}

