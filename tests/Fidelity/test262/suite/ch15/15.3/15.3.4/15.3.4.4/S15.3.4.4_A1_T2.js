// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The call method performs a function call using the [[Call]] property of the object. If the object does not have a [[Call]] property, a TypeError exception is thrown
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A1_T2.js
 * @description Calling "call" method of the object that does not have a [[Call]] property.
 * Prototype of the object is Function.prototype
 */

function FACTORY(){};

FACTORY.prototype=Function.prototype;

var obj = new FACTORY;

//CHECK#1
if (typeof obj.call !== "function") {
  $ERROR('#1: call method accessed');
}

//CHECK#2
try {
  obj.call();
  $FAIL('#2: If the object does not have a [[Call]] property, a TypeError exception is thrown');
} catch (e) {
  if (!(e instanceof TypeError)) {
  	$ERROR('#2.1: If the object does not have a [[Call]] property, a TypeError exception is thrown');
  }
}

