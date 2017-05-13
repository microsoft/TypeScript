// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The RegExp.prototype.test.length property has the attribute ReadOnly
 *
 * @path ch15/15.10/15.10.6/15.10.6.3/S15.10.6.3_A10.js
 * @description Checking if varying the RegExp.prototype.test.length property fails
 */

//CHECK#1
if (RegExp.prototype.test.hasOwnProperty('length') !== true) {
  $FAIL('#1: RegExp.prototype.test.hasOwnProperty(\'length\') === true');
}

__obj = RegExp.prototype.test.length;

RegExp.prototype.test.length = function(){return "shifted";};

//CHECK#2
if (RegExp.prototype.test.length !== __obj) {
  $ERROR('#2: __obj = RegExp.prototype.test.length; RegExp.prototype.test.length = function(){return "shifted";}; RegExp.prototype.test.length === __obj. Actual: ' + (RegExp.prototype.test.length));
}


