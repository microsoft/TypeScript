// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Assignment to string literals calls String constructor
 *
 * @path ch08/8.4/S8.4_A9_T1.js
 * @description Simple string variable compare with object String
 */

var str='ABC';
var strObj=new String('ABC');

////////////////////////////////////////////////////////////
// CHECK#1
if (str.constructor !== strObj.constructor){
  $ERROR('#1: \'ABC\'.constructor === new String(\'ABC\').constructor');
}
//
/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// CHECK#2
if (str != strObj){
  $ERROR('#2: "ABC" == new String("ABC")');
}
//
/////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////
// CHECK#3
if (str === strObj){
  $ERROR('#3: "ABC" !== new String("ABC")');
}
//
/////////////////////////////////////////////////////////////

