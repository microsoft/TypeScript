// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.match (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A1_T8.js
 * @description Call match (regexp) function with void 0 argument of string object;
 */

var __obj = {toString:function(){}};

var __matched = String(__obj).match(void 0);

var __expected = RegExp(void 0).exec("undefined"); 

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__matched.length !== __expected.length) {
  $ERROR('#1: __obj = {toString:function(){}}; __matched = String(__obj).match(void 0); __expected = RegExp(void 0).exec("undefined"); __matched.length === __expected.length. Actual: '+__matched.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__matched.index !== __expected.index) {
  $ERROR('#2: __obj = {toString:function(){}}; __matched = String(__obj).match(void 0); __expected = RegExp(void 0).exec("undefined"); __matched.index === __expected.index. Actual: '+__matched.index );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__matched.input !== __expected.input) {
  $ERROR('#3: __obj = {toString:function(){}}; __matched = String(__obj).match(void 0); __expected = RegExp(void 0).exec("undefined"); __matched.input === __expected.input. Actual: '+__matched.input );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
for(var index=0; index<__expected.length; index++) {
  if (__matched[index]!==__expected[index]) {
    $ERROR('#4.'+index+': __obj = {toString:function(){}}; __matched = String(__obj).match(void 0); __expected = RegExp(void 0).exec("undefined"); __matched['+index+']===__expected['+index+']. Actual: '+__matched[index]);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

