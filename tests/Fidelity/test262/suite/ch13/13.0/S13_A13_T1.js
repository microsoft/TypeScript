// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Deleting arguments[i] leads to breaking the connection to local reference
 *
 * @path ch13/13.0/S13_A13_T1.js
 * @description Deleting arguments[i]
 */

function __func(__arg){
  delete arguments[0];
  if (arguments[0] !== undefined) {
    $ERROR('#1.1: arguments[0] === undefined');
  }
  return __arg;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func(1) !== 1) {
	$ERROR('#1.2: __func(1) === 1. Actual: __func(1) ==='+__func(1));
}
//
//////////////////////////////////////////////////////////////////////////////

