// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of String.prototype.constructor is the built-in String constructor
 *
 * @path ch15/15.5/15.5.4/S15.5.4.1_A1_T2.js
 * @description Create new String.prototype.constructor object and check it
 */

var __constr = String.prototype.constructor;

var __instance = new __constr("choosing one");

//////////////////////////////////////////////////////////////////////////////
// CHECK#0
if (__instance !="choosing one") {
  $ERROR('#0: __constr = String.prototype.constructor; __instance = new __constr("choosing one"); __instance =="choosing one". Actual: __instance =='+__instance ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#1
if (__instance.constructor !== String) {
  $ERROR('#1: __constr = String.prototype.constructor; __instance = new __constr("choosing one"); __instance.constructor === String. Actual: __instance.constructor ==='+__instance.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#2
if (!(String.prototype.isPrototypeOf(__instance))) {
  $ERROR('#2: __constr = String.prototype.constructor; __instance = new __constr("choosing one"); String.prototype.isPrototypeOf(__instance) return true. Actual: '+String.prototype.isPrototypeOf(__instance)); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#3
var __to_string_result = '[object '+ 'String' +']';

delete String.prototype.toString;

if (__instance.toString() !== __to_string_result) {
  $ERROR('#3: __constr = String.prototype.constructor; __instance = new __constr("choosing one"); delete String.prototype.toString; __instance.toString() === __to_string_result. Actual: __instance.toString() ==='+__instance.toString()+' __to_string_result ==='+__to_string_result ); 
}
//
//////////////////////////////////////////////////////////////////////////////

