// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T13.js
 * @description Arguments are objects, and instance is string.
 * First object have overrided toString function.
 * Second object have overrided valueOf and toString functions
 */

var __obj = {toString:function(){return "\u0042\u0042";}}
var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}

var __split = "ABB\u0041BABAB\u0042cc^^\u0042Bvv%%B\u0042xxx".split(__obj, __obj2);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __split !== "object") {
  $ERROR('#1: var __obj = {toString:function(){return "u0042u0042";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}; __split = "ABBu0041BABABu0042cc^^u0042Bvv%%Bu0042xxx".split(__obj, __obj2); typeof __split === "object". Actual: '+typeof __split );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.constructor !== Array) {
  $ERROR('#2: var __obj = {toString:function(){return "u0042u0042";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}; __split = "ABBu0041BABABu0042cc^^u0042Bvv%%Bu0042xxx".split(__obj, __obj2); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split.length !== 2) {
  $ERROR('#3: var __obj = {toString:function(){return "u0042u0042";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}; __split = "ABBu0041BABABu0042cc^^u0042Bvv%%Bu0042xxx".split(__obj, __obj2); __split.length === 2. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__split[0] !== "A") {
  $ERROR('#4: var __obj = {toString:function(){return "u0042u0042";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}; __split = "ABBu0041BABABu0042cc^^u0042Bvv%%Bu0042xxx".split(__obj, __obj2); __split[0] === "A". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (__split[1] !== "ABABA") {
  $ERROR('#5: var __obj = {toString:function(){return "u0042u0042";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){return "2";}}; __split = "ABBu0041BABABu0042cc^^u0042Bvv%%Bu0042xxx".split(__obj, __obj2); __split[1] === "ABABA". Actual: '+__split[1] );
}
//
//////////////////////////////////////////////////////////////////////////////

