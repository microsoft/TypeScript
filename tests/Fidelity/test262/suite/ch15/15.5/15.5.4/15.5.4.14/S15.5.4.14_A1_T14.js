// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T14.js
 * @description Arguments are objects, and instance is string.
 * First object have overrided toString function, that throw exception.
 * Second object have overrided valueOf function, that throw exception
 */

var __obj = {toString:function(){throw "intostr";}};
var __obj2 = {valueOf:function(){throw "intoint";}};
var __instance = new Number(10001.10001);
Number.prototype.split=String.prototype.split;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
with(__instance){
    try {
      var x = split(__obj, __obj2);
      $FAIL('#1: "var x = split(__obj, __obj2)" lead to throwing exception');
    } catch (e) {
      if (e!=="intoint") {
        $ERROR('#1.1: Exception === "intoint". Actual: '+e);
      }
    }
}
//
//////////////////////////////////////////////////////////////////////////////

