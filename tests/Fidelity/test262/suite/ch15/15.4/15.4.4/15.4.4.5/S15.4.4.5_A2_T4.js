// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The join function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A2_T4.js
 * @description Operator use ToNumber from length.
 * If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

var obj = {};
obj.join = Array.prototype.join;

//CHECK#1
obj.length = {valueOf: function() {return 3}};
if (obj.join() !== ",,") {
  $ERROR('#1: obj.length = {valueOf: function() {return 3}}  obj.join() === ",,". Actual: ' + (obj.join()));
}

//CHECK#2
obj.length = {valueOf: function() {return 3}, toString: function() {return 2}};
if (obj.join() !== ",,") {
  $ERROR('#2: obj.length = {valueOf: function() {return 3}, toString: function() {return 2}}  obj.join() === ",,". Actual: ' + (obj.join()));
} 

//CHECK#3
obj.length = {valueOf: function() {return 3}, toString: function() {return {}}};
if (obj.join() !== ",,") {
  $ERROR('#3: obj.length = {valueOf: function() {return 3}, toString: function() {return {}}}  obj.join() === ",,". Actual: ' + (obj.join()));
}

//CHECK#4
try {  
  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}};  
  if (obj.join() !== ",,") {
    $ERROR('#4.1: obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.join() === ",". Actual: ' + (obj.join()));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.join() not throw "error"');
  } else {
    $ERROR('#4.3: obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.join() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
obj.length = {toString: function() {return 2}};
if (obj.join() !== ",") {
  $ERROR('#5: obj.length = {toString: function() {return 2}}  obj.join() === ",". Actual: ' + (obj.join()));
}

//CHECK#6
obj.length = {valueOf: function() {return {}}, toString: function() {return 2}}
if (obj.join() !== ",") {
  $ERROR('#6: obj.length = {valueOf: function() {return {}}, toString: function() {return 2}}  obj.join() === ",". Actual: ' + (obj.join()));
}

//CHECK#7
try {
  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 2}};  
  obj.join();
  $ERROR('#7.1: obj.length = {valueOf: function() {throw "error"}, toString: function() {return 2}}; obj.join() throw "error". Actual: ' + (obj.join()));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: obj.length = {valueOf: function() {throw "error"}, toString: function() {return 2}}; obj.join() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  obj.join();
  $ERROR('#8.1: obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.join() throw TypeError. Actual: ' + (obj.join()));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8,2: obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.join() throw TypeError. Actual: ' + (e));
  } 
}

