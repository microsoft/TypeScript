// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The specification does not provide any means for a program to access [[class]] value except through Object.prototype.toString
 *
 * @path ch08/8.6/8.6.2/S8.6.2_A3.js
 * @description Get [[class]] value except through Object.prototype.toString
 */

var __obj={};
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.toString() !== "[object " + 'Object' + "]"){
  $ERROR('#1: var __obj={}; __obj.toString() === "[object " + \'Object\' + "]". Actual: ' + (__obj.toString()));
}
//
//////////////////////////////////////////////////////////////////////////////

