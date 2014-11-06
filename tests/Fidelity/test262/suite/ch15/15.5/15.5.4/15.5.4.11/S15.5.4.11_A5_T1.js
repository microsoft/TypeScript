// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Use replace with regexp as searchValue and use $ in replaceValue
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A5_T1.js
 * @description searchValue is  regexp /^(a+)\1*,\1+$/ and replaceValue is "$1"
 */

var __str = "aaaaaaaaaa,aaaaaaaaaaaaaaa";
var __pattern = /^(a+)\1*,\1+$/;
var __repl = "$1";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__str.replace(__pattern, __repl)!=='aaaaa') {
  $ERROR('#1: var __str = "aaaaaaaaaa,aaaaaaaaaaaaaaa"; var __pattern = /^(a+)\1*,\1+$/; var __repl = "$1"; __str.replace(__pattern, __repl)===\'aaaaa\'. Actual: '+__str.replace(__pattern, __repl));
}
//
//////////////////////////////////////////////////////////////////////////////

