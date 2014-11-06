// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T9.js
 * @description Call toUpperCase() function of string object
 */

var __obj = {
    valueOf:function(){},
    toString:void 0
};

var __upperCase = new String(__obj).toUpperCase();

var __expected ="UNDEFINED"; 

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__upperCase.length !== __expected.length) {
  $ERROR('#1: __obj = {valueOf:function(){}, toString:void 0}; __upperCase = new String(__obj).toUpperCase(); __expected ="UNDEFINED"; __upperCase.length === __expected.length. Actual: '+__upperCase.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__upperCase.index !== __expected.index) {
  $ERROR('#2: __obj = {valueOf:function(){}, toString:void 0}; __upperCase = new String(__obj).toUpperCase(); __expected ="UNDEFINED"; __upperCase.index === __expected.index. Actual: '+__upperCase.index );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__upperCase.input !== __expected.input) {
  $ERROR('#3: __obj = {valueOf:function(){}, toString:void 0}; __upperCase = new String(__obj).toUpperCase(); __expected ="UNDEFINED"; __upperCase.input === __expected.input. Actual: '+__upperCase.input );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
for(var index=0; index<__expected.length; index++) {
  if (__upperCase[index]!==__expected[index]) {
    $ERROR('#4.'+index+': __obj = {valueOf:function(){}, toString:void 0}; __upperCase = new String(__obj).toUpperCase(); __expected ="UNDEFINED"; __upperCase['+index+']==='+__expected[index]+'. Actual: '+__upperCase[index]);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

