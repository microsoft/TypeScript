// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split(separator, limit):
 * i) can be transferred to other kinds of objects for use as a method.
 * separator and limit can be any kinds of object since:
 * ii) if separator is not RegExp ToString(separator) performs and
 * iii) ToInteger(limit) performs
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A1_T15.js
 * @description Arguments are objects, and instance is string.
 * First object have overrided toString function and valueOf function, that throw exception.
 * Second object have overrided valueOf function, that throw exception
 */

var __obj = {toString:function(){return {};},valueOf:function(){throw "intostr";}};

var __obj2 = {valueOf:function(){throw "intointeger";}};

__FACTORY.prototype.split = String.prototype.split;

var __instance = new __FACTORY(void 0);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
  var x = __instance.split(__obj, __obj2);
  $FAIL('#1: "var x = __instance.split(__obj, __obj2)" lead to throwing exception');
} catch (e) {
  if (e!=="intointeger") {
    $ERROR('#1.1: Exception === "intointeger". Actual: '+e);
  }
}
//
//////////////////////////////////////////////////////////////////////////////

function __FACTORY( value ) {
    this.value = value;
    this.toString = function() { return new Number; };
    this.valueOf=function(){return this.value+""};
}

