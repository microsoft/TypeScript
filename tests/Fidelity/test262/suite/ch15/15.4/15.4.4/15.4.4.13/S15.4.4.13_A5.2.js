// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of unshift has the attribute DontDelete
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A5.2.js
 * @description Checking use hasOwnProperty, delete
 * @noStrict
 */

//CHECK#1
if (Array.prototype.unshift.hasOwnProperty('length') !== true) {
  $FAIL('#1: Array.prototype.unshift.hasOwnProperty(\'length\') === true. Actual: ' + (Array.prototype.unshift.hasOwnProperty('length')));
}

delete Array.prototype.unshift.length;

//CHECK#2
if (Array.prototype.unshift.hasOwnProperty('length') !== true) {
  $ERROR('#2: delete Array.prototype.unshift.length; Array.prototype.unshift.hasOwnProperty(\'length\') === true. Actual: ' + (Array.prototype.unshift.hasOwnProperty('length')));
}

//CHECK#3
if (Array.prototype.unshift.length === undefined) {
  $ERROR('#3: delete Array.prototype.unshift.length; Array.prototype.unshift.length !== undefined');
}



