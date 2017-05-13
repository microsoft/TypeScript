// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.localeCompare(that)
 *
 * @path ch15/15.5/15.5.4/15.5.4.9/S15.5.4.9_A1_T1.js
 * @description This string is symbol and arguments are symbols
 */

var str1 = new String("h"); 
//CHECK#1
var str2 = new String ("\x68");
if  (str1.localeCompare(str2)!==0){
  $ERROR('#1: var str1 = new String("h"); var str2 = new String ("\\x68"); str1.localeCompare(str2)===0. Actual: '+str1.localeCompare(str2));
}

//CHECK#2
var str2 = new String ("\u0068");
if  (str1.localeCompare(str2)!==0){
  $ERROR('#2: var str1 = new String("h"); var str2 = new String ("\\u0068"); str1.localeCompare(str2)===0. Actual: '+str1.localeCompare(str2));
}

//CHECK#3
var str2 = new String ("h");
if  (str1.localeCompare(str2)!==0){
  $ERROR('#3: var str1 = new String("h"); var str2 = new String ("h"); str1.localeCompare(str2)===0. Actual: '+str1.localeCompare(str2));
}

