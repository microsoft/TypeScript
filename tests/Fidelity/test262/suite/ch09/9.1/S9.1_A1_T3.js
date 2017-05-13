// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of primitive conversion from object is a default value for the Object
 *
 * @path ch09/9.1/S9.1_A1_T3.js
 * @description Using operator "+". This operator firstly calls ToPrimitive and then calls ToString or ToNumber
 */

// CHECK#1
var object = {valueOf: function() {return 1}, toString: function() {return 0}};
if (object + "" !== "1") {
  $ERROR('#1: var object = {valueOf: function() {return 1}, toString: function() {return 0}}; object + "" === "1". Actual: ' + (object + ""));
}

// CHECK#2
var object = {valueOf: function() {return "1"}, toString: function() {return 0}};
if (object + 0 !== "10") {
  $ERROR('#2: var object = {valueOf: function() {return "1"}, toString: function() {return 0}}; object + 0 === "10". Actual: ' + (object + 0));
}


