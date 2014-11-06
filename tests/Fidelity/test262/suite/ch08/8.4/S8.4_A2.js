// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Empty string has type string
 *
 * @path ch08/8.4/S8.4_A2.js
 * @description Create empty string and check it type
 */

/////////////////////////////////////////////////////////
// CHECK#1
var str = '';
if (typeof(str) !== 'string'){
  $ERROR('#1: var str = \'\'; typeof(str) === \'string\'. Actual: ' + (typeof(str)));
}
//
////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////
// CHECK#2
var str = "";
if (typeof(str) !== "string"){
  $ERROR('#2: var str = ""; typeof(str) === "string". Actual: ' + (str));
}
//
////////////////////////////////////////////////////////

