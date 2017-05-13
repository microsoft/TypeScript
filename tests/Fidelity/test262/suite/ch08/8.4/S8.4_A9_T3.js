// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Assignment to string literals calls String constructor
 *
 * @path ch08/8.4/S8.4_A9_T3.js
 * @description Simple empty string variable compare with empty object String
 */

var str="";
var strObj=new String;

////////////////////////////////////////////////////////////
// CHECK#1
if (str.constructor !== strObj.constructor){
  $ERROR('#1: "".constructor === new String.constructor');
}
//
/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// CHECK#2
if (str != strObj){
  $ERROR('#2: values of str=""; and strObj=new String(""); are equal');
}
//
/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// CHECK#3
if (str === strObj){
  $ERROR('#3: objects of str=""; and strObj=new String(""); are different');
}
//
/////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (typeof str == typeof strObj){
  $ERROR('#4: types of str=""; and strObj=new String(""); are different');
}
//
//////////////////////////////////////////////////////////////////////////////


