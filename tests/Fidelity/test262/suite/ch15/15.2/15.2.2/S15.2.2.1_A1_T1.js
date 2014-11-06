// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with no arguments the following steps are taken:
 * (The argument value was not supplied or its type was Null or Undefined.)
 *   i)	Create a new native ECMAScript object.
 *  ii) 	The [[Prototype]] property of the newly constructed object is set to the Object prototype object.
 * iii) 	The [[Class]] property of the newly constructed object is set to "Object".
 *  iv) 	The newly constructed object has no [[Value]] property.
 *   v) 	Return the newly created native object
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A1_T1.js
 * @description Creating new Object() and checking its properties
 */

var obj = new Object();

// CHECK#0
if (obj === undefined) {
  $ERROR('#0: new Object() return the newly created native object.');
}

// CHECK#1
if (obj.constructor !== Object) {
  $ERROR('#1: new Object() create a new native ECMAScript object');
}

// CHECK#2
if (!(Object.prototype.isPrototypeOf(obj))) {
  $ERROR('#2: when new Object() calls the [[Prototype]] property of the newly constructed object is set to the Object prototype object.');
}

// CHECK#3
var to_string_result = '[object '+ 'Object' +']';
if (obj.toString() !== to_string_result) {
  $ERROR('#3: when new Object() calls the [[Class]] property of the newly constructed object is set to "Object".');
}

// CHECK#4
if (obj.valueOf().toString() !== to_string_result.toString()) {
  $ERROR('#4: when new Object() calls the newly constructed object has no [[Value]] property.');
}


