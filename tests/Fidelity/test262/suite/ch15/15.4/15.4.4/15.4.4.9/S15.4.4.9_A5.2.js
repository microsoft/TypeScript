// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of shift has the attribute DontDelete
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A5.2.js
 * @description Checking use hasOwnProperty, delete
 */

//CHECK#1
if (Array.prototype.shift.hasOwnProperty('length') !== true) {
  $FAIL('#1: Array.prototype.shift.hasOwnProperty(\'length\') === true. Actual: ' + (Array.prototype.shift.hasOwnProperty('length')));
}

delete Array.prototype.shift.length;

//CHECK#2
if (Array.prototype.shift.hasOwnProperty('length') !== true) {
  $ERROR('#2: delete Array.prototype.shift.length; Array.prototype.shift.hasOwnProperty(\'length\') === true. Actual: ' + (Array.prototype.shift.hasOwnProperty('length')));
}

//CHECK#3
if (Array.prototype.shift.length === undefined) {
  $ERROR('#3: delete Array.prototype.shift.length; Array.prototype.shift.length !== undefined');
}



