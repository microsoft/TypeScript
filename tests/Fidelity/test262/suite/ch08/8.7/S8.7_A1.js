// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multiple Variables should Referring to a Single Object
 *
 * @path ch08/8.7/S8.7_A1.js
 * @description Create object and refers to the other object, modify a property in the original object.
 *  We now see that that change is represented in both variables
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#
// Set obj to an empty object
//
var obj = new Object();
// objRef now refers to the other object
//
var objRef = obj;
// Modify a property in the original object
objRef.oneProperty = -1;
obj.oneProperty = true;
// We now see that that change is represented in both variables
// (Since they both refer to the same object)
if(objRef.oneProperty !== true){
  $ERROR('#1: var obj = new Object(); var objRef = obj; objRef.oneProperty = -1; obj.oneProperty = true; objRef.oneProperty === true. Actual: ' + (objRef.oneProperty));
};
//
//////////////////////////////////////////////////////////////////////////////

