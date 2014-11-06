// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number instances have no special properties beyond those
 * inherited from the Number prototype object
 *
 * @path ch15/15.7/15.7.5/S15.7.5_A1_T01.js
 * @description Checking property constructor
 */

//CHECK#1
if((new Number()).hasOwnProperty("constructor") !== false){
  $ERROR('#1: Number instance must have no special property "constructor"');
}

//CHECK#2
if((new Number()).constructor !== Number.prototype.constructor){
  $ERROR('#2: Number instance property "constructor" must be inherited from Number prototype object');
}


