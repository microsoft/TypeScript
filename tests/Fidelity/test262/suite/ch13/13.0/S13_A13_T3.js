// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Deleting arguments[i] leads to breaking the connection to local reference
 *
 * @path ch13/13.0/S13_A13_T3.js
 * @description Changing argument value, deleting the argument and then defining a new value for arguments[i]
 */

function __func(__arg){
  __arg = 2;
  delete arguments[0];
  if (arguments[0] !== undefined) {
    $ERROR('#1.1: arguments[0] === undefined');
  }
  arguments[0] = "A";
  if (arguments[0] !== "A") {
    $ERROR('#1.2: arguments[0] === "A"');
  }
  return __arg;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func(1) !== 2) {
	$ERROR('#1.3: __func(1) === 2. Actual: __func(1) ==='+__func(1));
}
//
//////////////////////////////////////////////////////////////////////////////

