// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since when call is used for Function constructor themself new function instance creates
 * and then first argument(thisArg) should be ignored
 *
 * @path ch15/15.3/S15.3_A3_T5.js
 * @description First argument is this, and this don`t have needed variable. Function return this.var_name
 */

var f=Function.call(this, "return this.planet;");
var g=Function.call(this, "return this.color;");

//CHECK#1
if (f() !== undefined) {
  $ERROR('#2: ');
}

var planet="mars";

//CHECK#2
if (f() !== "mars") {
  $ERROR('#2: ');
}

//CHECK#3
if (g() !== undefined) {
  $ERROR('#3: ');
}   

this.color="red";

//CHECK#4
if (g() !== "red") {
  $ERROR('#4: ');
}

