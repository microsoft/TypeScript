// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator !x uses GetValue
 *
 * @path ch11/11.4/11.4.9/S11.4.9_A2.1_T1.js
 * @description Either Type(x) is not Reference or GetBase(x) is not null
 */

//CHECK#1
if (!true !== false) {
  $ERROR('#1: !true === false');
}

//CHECK#2
if (!(!true) !== true) {
  $ERROR('#2: !(!true) === true');
}

//CHECK#3
var x = true;
if (!x !== false) {
  $ERROR('#3: var x = true; !x === false');
}

//CHECK#4
var x = true;
if (!(!x) !== true) {
  $ERROR('#4: var x = true; !(!x) === true');
}

//CHECK#5
var object = new Object();
object.prop = true;
if (!object.prop !== false) {
  $ERROR('#5: var object = new Object(); object.prop = true; !object.prop === false');
}

