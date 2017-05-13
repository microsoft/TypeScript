// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Being in function code, "this" and eval("this"), called as a functions, return the global object
 *
 * @path ch11/11.1/11.1.1/S11.1.1_A3.1.js
 * @description Creating function which returns "this" or eval("this")
 * @noStrict
 */

//CHECK#1
function MyFunction() {return this}
if (MyFunction() !== this) {
  $ERROR('#1: function MyFunction() {return this} MyFunction() === this. Actual: ' + (MyFunction()));
}

//CHECK#2
function MyFunction() {return eval("this")}
if (MyFunction() !== this) {
  $ERROR('#2: function MyFunction() {return eval("this")} MyFunction() === this. Actual: ' + (MyFunction()));
}



