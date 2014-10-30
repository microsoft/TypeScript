// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Changing property using "eval" statement containing "with" statement
 *
 * @path ch12/12.10/S12.10_A4_T2.js
 * @description Changing number property
 * @noStrict
 */

this.p1 = 'a';
var myObj = {
  p1: 1, 
}
eval("with(myObj){p1=2}");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if(myObj.p1 !== 2){
  $ERROR('#1: myObj.p1 === 2. Actual:  myObj.p1 ==='+ myObj.p1  );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if(myObj.p1 === 'a'){
  $ERROR('#2: myObj.p1 !== \'a\'');
}
//
//////////////////////////////////////////////////////////////////////////////

