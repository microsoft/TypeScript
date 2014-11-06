// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * replace with regexp /([a-z]+)([0-9]+)/ and replace function returns
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A4_T3.js
 * @description searchValue is /([a-z]+)([0-9]+)/i
 */

var __str = "aBc12 def34";
var __pattern = /([a-z]+)([0-9]+)/i;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__str.replace(__pattern, __replFN)!=='12aBc def34') {
  $ERROR('#1: var __str = "aBc12 def34"; var __pattern = /([a-z]+)([0-9]+)/i; function __replFN() {return arguments[2] + arguments[1];}; __str.replace(__pattern, __replFN)===\'12aBc def34\'. Actual: '+__str.replace(__pattern, __replFN));
}
//
//////////////////////////////////////////////////////////////////////////////
    
function __replFN() {
    return arguments[2] + arguments[1];
}

