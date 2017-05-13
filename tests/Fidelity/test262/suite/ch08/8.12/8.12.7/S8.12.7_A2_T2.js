// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Delete]] method of O is called with property name P,
 * and if O doesn't have a property with name P, return true
 *
 * @path ch08/8.12/8.12.7/S8.12.7_A2_T2.js
 * @description Try to delete not existent properties of O, but existent property of prototype
 */

function Palette(){};
Palette.prototype = {red:0xFF0000, green:0x00FF00};
var __palette = new Palette;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__palette.red !== 0xFF0000){
  $ERROR('#1: function Palette(){}; Palette.prototype = {red:0xFF0000, green:0x00FF00}; __palette = new Palette; __palette.red === 0xFF0000. Actual: ' + (__palette.red));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (delete __palette.red !== true) {
  $ERROR('#2 function Palette(){}; Palette.prototype = {red:0xFF0000, green:0x00FF00}; __palette = new Palette; delete __palette.red === true. Actual: ' + (delete __palette.red));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__palette.red !== 0xFF0000){
  $ERROR('#3: function Palette(){}; Palette.prototype = {red:0xFF0000, green:0x00FF00}; __palette = new Palette; __palette.red === 0xFF0000. Actual: ' + (__palette.red));
}
//
//////////////////////////////////////////////////////////////////////////////


