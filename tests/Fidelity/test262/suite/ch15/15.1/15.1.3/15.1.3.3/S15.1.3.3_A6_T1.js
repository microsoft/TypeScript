// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A6_T1.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, String)
 */

//CHECK#1
var object = {valueOf: function() {return "^"}};
if (encodeURI(object) !== "%5Bobject%20Object%5D") {
  $ERROR('#1: var object = {valueOf: function() {return "^"}}; encodeURI(object) === %5Bobject%20Object%5D. Actual: ' + (encodeURI(object)));
}

//CHECK#2
var object = {valueOf: function() {return ""}, toString: function() {return "^"}};
if (encodeURI(object) !== "%5E") {
  $ERROR('#2: var object = {valueOf: function() {return ""}, toString: function() {return "^"}}; encodeURI(object) === "%5E". Actual: ' + (encodeURI(object)));
} 

//CHECK#3
var object = {valueOf: function() {return "^"}, toString: function() {return {}}};
if (encodeURI(object) !== "%5E") {
  $ERROR('#3: var object = {valueOf: function() {return "^"}, toString: function() {return {}}}; encodeURI(object) === "%5E". Actual: ' + (encodeURI(object)));
}

//CHECK#4
try {
  var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}};
  if (encodeURI(object) !== "%5E") {
    $ERROR('#4.1: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURI(object) === "%5E". Actual: ' + (encodeURI(object)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURI(object) not throw "error"');
  } else {
    $ERROR('#4.3: var object = {valueOf: function() {throw "error"}, toString: function() {return "^"}}; encodeURI(object) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
var object = {toString: function() {return "^"}};
if (encodeURI(object) !== "%5E") {
  $ERROR('#5: var object = {toString: function() {return "^"}}; encodeURI(object) === "%5E". Actual: ' + (encodeURI(object)));
}

//CHECK#6
var object = {valueOf: function() {return {}}, toString: function() {return "^"}}
if (encodeURI(object) !== "%5E") {
  $ERROR('#6: var object = {valueOf: function() {return {}}, toString: function() {return "^"}}; encodeURI(object) === "%5E". Actual: ' + (encodeURI(object)));
}

//CHECK#7
try {
  var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}};
  encodeURI(object);
  $ERROR('#7.1: var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}}; encodeURI(object) throw "error". Actual: ' + (encodeURI(object)));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: var object = {valueOf: function() {return "^"}, toString: function() {throw "error"}}; encodeURI(object) throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  encodeURI(object);
  $ERROR('#8.1: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; encodeURI(object) throw TypeError. Actual: ' + (encodeURI(object)));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; encodeURI(object) throw TypeError. Actual: ' + (e));
  } 
}

