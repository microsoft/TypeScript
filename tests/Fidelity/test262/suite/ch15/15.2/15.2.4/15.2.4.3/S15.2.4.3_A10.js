// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.toLocaleString.length property has the attribute ReadOnly
 *
 * @path ch15/15.2/15.2.4/15.2.4.3/S15.2.4.3_A10.js
 * @description Checking if varying the Object.prototype.toLocaleString.length property fails
 */

//CHECK#1
if (!(Object.prototype.toLocaleString.hasOwnProperty('length'))) {
  $FAIL('#1: the Object.prototype.toLocaleString has length property.');
}

var obj = Object.prototype.toLocaleString.length;

Object.prototype.toLocaleString.length = function(){return "shifted";};

//CHECK#2
if (Object.prototype.toLocaleString.length !== obj) {
  $ERROR('#2: the Object.prototype.toLocaleString length property has the attributes ReadOnly.');
}

