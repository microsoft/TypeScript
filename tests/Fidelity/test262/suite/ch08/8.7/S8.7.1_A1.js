// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Delete operator deletes pure property, so it returns true to be applyed to this.property
 *
 * @path ch08/8.7/S8.7.1_A1.js
 * @description Try to delete this.y, where y is this.y=1
 */

this.y = 1;
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if((delete this.y) !== true){
  $ERROR('#1: this.y = 1; (delete this.y) === true. Actual: ' + ((delete this.y)));
};
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (this.y !== undefined){
  $ERROR('#2: this.y = 1; (delete this.y) === true; this.y === undefined. Actual: ' + (this.y));
}
//
//////////////////////////////////////////////////////////////////////////////

