// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toString have length property and it is equal 0
 *
 * @path ch15/15.5/15.5.4/S15.5.4.2_A4_T1.js
 * @description Checking String.prototype.toString.length property
 */

//CHECK#1
if (String.prototype.toString.hasOwnProperty('length')!==true){
  $ERROR('#1: String.prototype.toString.hasOwnProperty(\'length\')===true. Actual: '+String.prototype.toString.hasOwnProperty('length')); 
}
else{
//CHECK#2
if (String.prototype.toString.length!==0)
  $ERROR('#2: String.prototype.toString.length===0. Actual: String.prototype.toString.length==='+String.prototype.toString.length); 
}

