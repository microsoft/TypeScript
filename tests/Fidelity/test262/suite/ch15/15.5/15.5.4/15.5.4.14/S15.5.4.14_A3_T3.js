// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split() returns an Array object with:
 *  i) length equaled to 1,
 * ii) [[Get]](0) equaled to the result of converting this object to a string
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A3_T3.js
 * @description Instance is function(){}
 */

var __instance = { toString: function() { return "function(){}";} };

__instance.split = String.prototype.split;

var __split = __instance.split();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: var __instance = function(){}; __instance.split = String.prototype.split; __split = __instance.split(); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== 1) {
  $ERROR('#2: var __instance = function(){}; __instance.split = String.prototype.split; __split = __instance.split(); __split.length === 1. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split[0].substring(0,8) !== "function") {
  $ERROR('#3: var __instance = function(){}; __instance.split = String.prototype.split; __split = __instance.split(); __split[0].substring(0,8) === "function". Actual: '+__split[0].substring(0,8) );
}
//
//////////////////////////////////////////////////////////////////////////////

