// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Class]] property of the newly constructed object is set to "Error"
 *
 * @path ch15/15.11/15.11.1/S15.11.1.1_A3_T1.js
 * @description Checking Class of the newly constructed Error object using toSting() function
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
Error.prototype.toString=Object.prototype.toString;
var err1=Error();
if(err1.toString()!=='[object '+ 'Error' +']'){
  $ERROR('#1: Error.prototype.toString=Object.prototype.toString; var err1=Error(); err1.toString()===\'[object Error]\'. Actual: '+err1.toString());
}
//
//////////////////////////////////////////////////////////////////////////////

