// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * replace with regexp /([a-z]+)([0-9]+)/ and replace function returns
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A4_T1.js
 * @description searchValue is /([a-z]+)([0-9]+)/
 */

var __str = "abc12 def34";
var __pattern = /([a-z]+)([0-9]+)/;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__str.replace(__pattern, __replFN)!=='12abc def34') {
  $ERROR('#1: var __str = "abc12 def34"; var __pattern = /([a-z]+)([0-9]+)/; function __replFN() {return arguments[2] + arguments[1];}; __str.replace(__pattern, __replFN)===\'12abc def34\'. Actual: '+__str.replace(__pattern, __replFN));
}
//
//////////////////////////////////////////////////////////////////////////////
    
function __replFN() {
    return arguments[2] + arguments[1];
}

