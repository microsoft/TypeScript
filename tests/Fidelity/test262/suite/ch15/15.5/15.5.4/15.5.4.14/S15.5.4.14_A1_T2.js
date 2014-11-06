// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T2.js
 * @description Arguments are boolean expression, function call and null, and instance is Boolean
 */

var __instance = new Boolean;

__instance.split = String.prototype.split;

var __split = __instance.split("A"!=="\u0041", function(){return 0;}(),null);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __split !== "object") {
  $ERROR('#1: __instance = new Boolean; __instance.split = String.prototype.split; __split = __instance.split("A"!=="u0041", function(){return 0;}(),null); typeof __split === "object". Actual: '+typeof __split );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.constructor !== Array) {
  $ERROR('#2: __instance = new Boolean; __instance.split = String.prototype.split; __split = __instance.split("A"!=="u0041", function(){return 0;}(),null); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split.length !== 0) {
  $ERROR('#3: __instance = new Boolean; __instance.split = String.prototype.split; __split = __instance.split("A"!=="u0041", function(){return 0;}(),null); __split.length === 0. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

