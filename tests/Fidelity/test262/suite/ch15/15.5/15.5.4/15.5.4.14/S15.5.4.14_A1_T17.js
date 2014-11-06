// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T17.js
 * @description Argument is regexp, and instance is Number
 */

var __re = /\u0037\u0037/g;

Number.prototype.split=String.prototype.split;

__split = 6776767677.006771122677555.split(__re);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __split !== "object") {
  $ERROR('#1: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); typeof __split === "object". Actual: '+typeof __split );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.constructor !== Array) {
  $ERROR('#2: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split.length !== 4) {
  $ERROR('#3: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split.length === 4. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__split[0] !== "6") {
  $ERROR('#4: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split[0] === "6". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (__split[1] !== "67676") {
  $ERROR('#5: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split[1] === "67676". Actual: '+__split[1] );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#6
if (__split[2] !== ".006") {
  $ERROR('#6: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split[2] === ".006". Actual: '+__split[2] );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#7
if (__split[3] !== "1") {
  $ERROR('#7: var __re = /u0037u0037/g; Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re); __split[3] === "1". Actual: '+__split[3] );
}
//
//////////////////////////////////////////////////////////////////////////////

