// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T18.js
 * @description Checking by using eval
 */

var __re =  new RegExp("00");

Number.prototype.split=String.prototype.split;

var __split = 6776767677.006771122677555.split(__re, eval("\"1\""));

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __split !== "object") {
  $ERROR('#1: var __re =  new RegExp("00"); Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re, eval(""1"")); typeof __split === "object". Actual: '+typeof __split );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.constructor !== Array) {
  $ERROR('#2: var __re =  new RegExp("00"); Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re, eval(""1"")); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split.length !== 1) {
  $ERROR('#3: var __re =  new RegExp("00"); Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re, eval(""1"")); __split.length === 1. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split[0] !== "6776767677.") {
  $ERROR('#3: var __re =  new RegExp("00"); Number.prototype.split=String.prototype.split; __split = 6776767677.006771122677555.split(__re, eval(""1"")); __split[0] === "6776767677.". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

