// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The propertyIsEnumerable method does not consider objects in the prototype chain
 *
 * @path ch15/15.2/15.2.4/15.2.4.7/S15.2.4.7_A1_T1.js
 * @description Calling the propertyIsEnumerable method for object in the prototype chain
 */

//CHECK#1
if (typeof Object.prototype.propertyIsEnumerable !== "function") {
  $ERROR('#1: propertyIsEnumerable method is defined');
}

var proto={rootprop:"avis"};

function AVISFACTORY(name){this.name=name};

AVISFACTORY.prototype = proto;

var seagull= new AVISFACTORY("seagull");

//CHECK#2
if (typeof seagull.propertyIsEnumerable !== "function") {
  $ERROR('#2: propertyIsEnumerable method is accessed');
}

//CHECK#3
if (!(seagull.propertyIsEnumerable("name"))) {
  $ERROR('#3: propertyIsEnumerable method works properly');
}

//CHECK#4
if (seagull.propertyIsEnumerable("rootprop")) {
  $ERROR('#4: propertyIsEnumerable method does not consider objects in the prototype chain');
}
//

