// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.indexOf(searchString, position)
 *
 * @path ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A1_T12.js
 * @description Argument is string, and instance is array of strings
 */

var __instance = new Array('new','zoo','revue');

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.indexOf('new') !== 0) {
  $ERROR('#1: __instance = new Array(\'new\',\'zoo\',\'revue\'); __instance.indexOf(\'new\') === 0. Actual: '+__instance.indexOf('new') ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__instance.indexOf('zoo') !== 1) {
  $ERROR('#2: __instance = new Array(\'new\',\'zoo\',\'revue\'); __instance.indexOf(\'zoo\') === 1. Actual: '+__instance.indexOf('zoo') ); 
}
//
//////////////////////////////////////////////////////////////////////////////

