// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A6_T1.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, String)
 */

//CHECK#1
var object = {valueOf: function() {return "^"}};
if (encodeURIComponent(object) !== "%5Bobject%20Object%5D") {
  $ERROR('#1: var object = {valueOf: function() {return "^"}}; encodeURIComponent(object) === %5Bobject%20Object%5D. Actual: ' + (encodeURIComponent(object)));
}

//CHECK#2
var object = {valueOf: function() {return ""}, toString: function() {return "^"}};
if (encodeURIComponent(object) !== "%5E") {
  $ERROR('#2: var object = {valueOf: function() {return ""}, toString: function() {return "^"}}; encodeURIComponent(object) === "%5E". Actual: ' + (encodeURIComponent(object)));
} 

//CHECK#3
var object = {valueOf: function() {return "^"}, toString: function() {return {}}};
if (encodeURIComponent(object) !== "%5E") {
  $ERROR('#3: var object = {valueOf: function() {return "^"}, toString: function() {return {}}}; encodeURIComponent(object) === "%5E". Actual: ' + (encodeURIComponent(object)));
}

//CHECK#4
try {
  var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}};
  if (encodeURIComponent(object) !== "%5E") {
    $ERROR('#4.1: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURIComponent(object) === "%5E". Actual: ' + (encodeURIComponent(object)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURIComponent(object) not throw "error"');
  } else {
    $ERROR('#4.3: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURIComponent(object) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
var object = {toString: function() {return "^"}};
if (encodeURIComponent(object) !== "%5E") {
  $ERROR('#5: var object = {toString: function() {return "^"}}; encodeURIComponent(object) === "%5E". Actual: ' + (encodeURIComponent(object)));
}

//CHECK#6
var object = {valueOf: function() {return {}}, toString: function() {return "^"}}
if (encodeURIComponent(object) !== "%5E") {
  $ERROR('#6: var object = {valueOf: function() {return {}}, toString: function() {return "^"}}; encodeURIComponent(object) === "%5E". Actual: ' + (encodeURIComponent(object)));
}

//CHECK#7
try {
  var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}};
  encodeURIComponent(object);
  $ERROR('#7.1: var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}}; encodeURIComponent(object) throw "error". Actual: ' + (encodeURIComponent(object)));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}}; encodeURIComponent(object) throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  encodeURIComponent(object);
  $ERROR('#8.1: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; encodeURIComponent(object) throw TypeError. Actual: ' + (encodeURIComponent(object)));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; encodeURIComponent(object) throw TypeError. Actual: ' + (e));
  } 
}

