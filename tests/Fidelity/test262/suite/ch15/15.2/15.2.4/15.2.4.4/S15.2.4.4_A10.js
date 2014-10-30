// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.valueOf.length property has the attribute ReadOnly
 *
 * @path ch15/15.2/15.2.4/15.2.4.4/S15.2.4.4_A10.js
 * @description Checking if varying the Object.prototype.valueOf.length property fails
 */

//CHECK#1
if (!(Object.prototype.valueOf.hasOwnProperty('length'))) {
  $FAIL('#1: the Object.prototype.valueOf has length property.');
}

var obj = Object.prototype.valueOf.length;

Object.prototype.valueOf.length = function(){return "shifted";};

//CHECK#2
if (Object.prototype.valueOf.length !== obj) {
  $ERROR('#2: the Object.prototype.valueOf length property has the attributes ReadOnly.');
}

