// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator uses ToNumber
 *
 * @path ch09/9.6/S9.6_A3.1_T4.js
 * @description Type(x) is Object
 */

//CHECK#1
var object = {valueOf: function() {return 1}};
if ((object >>> 0) !== 1) {
  $ERROR('#1: var object = {valueOf: function() {return 1}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
}

//CHECK#2
var object = {valueOf: function() {return 1}, toString: function() {return 0}};
if ((object >>> 0) !== 1) {
  $ERROR('#2: var object = {valueOf: function() {return 1}, toString: function() {return 0}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
} 

//CHECK#3
var object = {valueOf: function() {return 1}, toString: function() {return {}}};
if ((object >>> 0) !== 1) {
  $ERROR('#3: var object = {valueOf: function() {return 1}, toString: function() {return {}}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
}

//CHECK#4
try {
  var object = {valueOf: function() {return 1}, toString: function() {throw "error"}};
  if ((object >>> 0) !== 1) {
    $ERROR('#4.1: var object = {valueOf: function() {return 1}, toString: function() {throw "error"}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: var object = {valueOf: function() {return 1}, toString: function() {throw "error"}}; object not throw "error"');
  } else {
    $ERROR('#4.3: var object = {valueOf: function() {return 1}, toString: function() {throw "error"}}; object not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
var object = {toString: function() {return 1}};
if ((object >>> 0) !== 1) {
  $ERROR('#5: var object = {toString: function() {return 1}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
}

//CHECK#6
var object = {valueOf: function() {return {}}, toString: function() {return 1}}
if ((object >>> 0) !== 1) {
  $ERROR('#6: var object = {valueOf: function() {return {}}, toString: function() {return 1}}; (object >>> 0) === 1. Actual: ' + ((object >>> 0)));
}

//CHECK#7
try {
  var object = {valueOf: function() {throw "error"}, toString: function() {return 1}};
  object >>> 0;
  $ERROR('#7.1: var object = {valueOf: function() {throw "error"}, toString: function() {return 1}}; object throw "error". Actual: ' + (object >>> 0));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: var object = {valueOf: function() {throw "error"}, toString: function() {return 1}}; object throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  object >>> 0;
  $ERROR('#8.1: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; object throw TypeError. Actual: ' + (object >>> 0));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; object throw TypeError. Actual: ' + (e));
  } 
}

