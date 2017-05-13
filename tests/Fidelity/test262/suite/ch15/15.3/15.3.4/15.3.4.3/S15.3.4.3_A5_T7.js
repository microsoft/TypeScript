// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If thisArg is not null(defined) the called function is passed ToObject(thisArg) as the this value
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A5_T7.js
 * @description thisArg is new Number()
 */

var obj=new Number(1);

Function("this.touched= true;").apply(obj);

//CHECK#1
if (!(obj.touched)) {
  $ERROR('#1: If thisArg is not null(defined) the called function is passed ToObject(thisArg) as the this value');
}


