// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Error.prototype property has the attributes {DontEnum}
 *
 * @path ch15/15.11/15.11.3/S15.11.3.1_A2_T1.js
 * @description Checking if enumerating the Error.prototype property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#0
if (!(Error.hasOwnProperty('prototype'))) {
  $ERROR('#0: Error.hasOwnProperty(\'prototype\') return true. Actual: '+Error.hasOwnProperty('prototype'));
}
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// CHECK#1
if (Error.propertyIsEnumerable('prototype')) {
  $ERROR('#1: Error.propertyIsEnumerable(\'prototype\') return false. Actual: '+Error.propertyIsEnumerable('prototype'));
}
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// CHECK#2
cout=0;

for (p in Error){
  if (p==="prototype") cout++;
}

if (cout !== 0) {
  $ERROR('#2: cout === 0. Actual: '+cout );
}
//
//////////////////////////////////////////////////////////////////////////////

