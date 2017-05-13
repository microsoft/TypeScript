// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Assume F is a Function object. When the [[HasInstance]] method of F is called with value V and V is an object, the following steps are taken:
 * i) Call the [[Get]] method of F with property name "prototype".
 * ii) Let O be Result(i) and O is an object.
 * iii) Let V be the value of the [[Prototype]] property of V.
 * iv) If V is null, return false.
 * v)  If O and V refer to the same object or if they refer to objects joined to each other (13.1.2), return true.
 * vi) Go to step iii)
 *
 * @path ch15/15.3/15.3.5/S15.3.5.3_A3_T1.js
 * @description F.prototype.type is 1, and V is new F
 */

FACTORY = Function("this.name=\"root\"");

FACTORY.prototype.type=1;

instance = new FACTORY;

//CHECK#1
if (!(instance instanceof FACTORY)) {
  $ERROR('#1: If O and V refer to the same object or if they refer to objects joined to each other (13.1.2), return true');
}

