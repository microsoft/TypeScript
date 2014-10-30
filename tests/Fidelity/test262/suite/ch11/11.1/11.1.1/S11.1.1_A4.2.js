// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Being in anonymous code, "this" and eval("this"), called as a constructor, return the object
 *
 * @path ch11/11.1/11.1.1/S11.1.1_A4.2.js
 * @description Creating function by using new Function() constructor. It has the property, which returns "this"
 */

//CHECK#1
var MyFunction = new Function("this.THIS = this");
var MyObject = new MyFunction();
if (MyObject.THIS.toString() !== "[object Object]") {
  $ERROR('#1: var MyFunction = new Function("this.THIS = this"); var MyObject = new MyFunction(); MyObject.THIS.toString() === "[object Object]". Actual: ' + (MyObject.THIS.toString()));
}

//CHECK#2
MyFunction = new Function("this.THIS = eval(\'this\')");
MyObject = new MyFunction();
if (MyObject.THIS.toString() !== "[object Object]") {
  $ERROR('#2: var MyFunction = new Function("this.THIS = eval(\'this\')"); var MyObject = new MyFunction(); MyObject.THIS.toString() === "[object Object]". Actual: ' + (MyObject.THIS.toString()));
}


