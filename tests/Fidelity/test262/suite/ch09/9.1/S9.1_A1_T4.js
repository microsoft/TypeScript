// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of primitive conversion from object is a default value for the Object
 *
 * @path ch09/9.1/S9.1_A1_T4.js
 * @description Using operator "<". The operator firstly calls ToPrimitive and then calls ToString or ToNumber
 */

// CHECK#1
var object = {valueOf: function() {return -2}, toString: function() {return "-2"}};
if ("-1" < object) {
  $ERROR('#1: var object = {valueOf: function() {return -2}, toString: function() {return "-2"}}; "-1" < object');
}

// CHECK#2
var object = {valueOf: function() {return "-2"}, toString: function() {return -2}};
if (object < "-1") {
  $ERROR('#2: var object = {valueOf: function() {return "-2"}, toString: function() {return -2}}; object < "-1"');
}


