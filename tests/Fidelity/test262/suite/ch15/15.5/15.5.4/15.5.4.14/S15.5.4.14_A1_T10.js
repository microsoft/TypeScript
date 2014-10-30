// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T10.js
 * @description Arguments are objects, and instance is string.
 * First object have overrided toString function.
 * Second object have overrided valueOf function
 */

var __obj = {toString:function(){return "\u0042B";}}
var __obj2 = {valueOf:function(){return true;}}
var __str = "ABB\u0041BABAB";

with(__str){
    __split = split(__obj, __obj2);
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __split !== "object") {
  $ERROR('#1: var __obj = {toString:function(){return "u0042B";}}; var __obj2 = {valueOf:function(){return true;}}; var __str = "ABBu0041BABAB"; with(__str){__split = split(__obj, __obj2);}; typeof __split === "object". Actual: '+typeof __split );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.constructor !== Array) {
  $ERROR('#2: var __obj = {toString:function(){return "u0042B";}}; var __obj2 = {valueOf:function(){return true;}}; var __str = "ABBu0041BABAB"; with(__str){__split = split(__obj, __obj2);}; __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split.length !== 1) {
  $ERROR('#3: var __obj = {toString:function(){return "u0042B";}}; var __obj2 = {valueOf:function(){return true;}}; var __str = "ABBu0041BABAB"; with(__str){__split = split(__obj, __obj2);}; __split.length === 1. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__split[0] !== "A") {
  $ERROR('#4: var __obj = {toString:function(){return "u0042B";}}; var __obj2 = {valueOf:function(){return true;}}; var __str = "ABBu0041BABAB"; with(__str){__split = split(__obj, __obj2);}; __split[0] === "A". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

