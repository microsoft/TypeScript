// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Assume F is a Function object. When the [[HasInstance]] method of F is called with value V and V is an object, the following steps are taken:
 * i) Call the [[Get]] method of F with property name "prototype".
 * ii) Let O be Result(i).
 * iii) O is not an object, throw a TypeError exception
 *
 * @path ch15/15.3/15.3.5/S15.3.5.3_A2_T2.js
 * @description F.prototype is undefined, and V is empty object
 */

FACTORY = new Function;

FACTORY.prototype = undefined;

obj={};

//CHECK#1
try {
  obj instanceof  FACTORY;
  $FAIL('#1: O is not an object, throw a TypeError exception');
} catch (e) {
  if (!(e instanceof TypeError)) {
  	$ERROR('#1.1: O is not an object, throw a TypeError exception');
  }
}



