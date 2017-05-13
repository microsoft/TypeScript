// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Delete operator can't delete reference, so it returns false to be applyed to reference
 *
 * @path ch08/8.7/S8.7.1_A2.js
 * @description Try to delete y, where y is var y=1
 * @noStrict
 */

var y = 1;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if(delete y){
  $ERROR('#1: y = 1; (delete y) === false. Actual: ' + ((delete y)));
};
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (y !== 1) {
  $ERROR('#2: y = 1; delete y; y === 1. Actual: ' + (y));
}
//
//////////////////////////////////////////////////////////////////////////////

