// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Properties of the [[Prototype]] object
 * are visible as properties of the child object for the purposes of get access, but not for put access
 *
 * @path ch08/8.6/8.6.2/S8.6.2_A2.js
 * @description Check visibility properties of the child object for the purposes of get access, but not for put access
 */

//Establish foo object
function FooObj(){};
FooObj.prototype.prop="some";

// Invoke instance of foo object
var foo= new FooObj;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (foo.prop !== "some"){
  $ERROR('#1: function FooObj(){}; FooObj.prototype.prop="some"; var foo= new FooObj; foo.prop === "some". Actual: ' + (foo.prop));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
foo.prop=true;
// Invoke another instance of foo object
var foo__ = new FooObj;
if (foo__.prop !== "some"){
  $ERROR('#2: function FooObj(){}; FooObj.prototype.prop="some"; var foo= new FooObj; foo.prop=true; var foo__ = new FooObj; foo__.prop === "some". Actual: ' + (foo__.prop));
}
//
//////////////////////////////////////////////////////////////////////////////

