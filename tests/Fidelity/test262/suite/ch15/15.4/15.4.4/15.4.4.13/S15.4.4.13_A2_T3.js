// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The unshift function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A2_T3.js
 * @description Operator use ToNumber from length.
 * If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

var obj = {};
obj.unshift = Array.prototype.unshift;

//CHECK#1
obj.length = {valueOf: function() {return 3}};
var unshift = obj.unshift();
if (unshift !== 3) {
  $ERROR('#1:  obj.length = {valueOf: function() {return 3}}  obj.unshift() === 3. Actual: ' + (unshift));
}

//CHECK#2
obj.length = {valueOf: function() {return 3}, toString: function() {return 1}};
var unshift = obj.unshift();
if (unshift !== 3) {
  $ERROR('#0:  obj.length = {valueOf: function() {return 3}, toString: function() {return 1}}  obj.unshift() === 3. Actual: ' + (unshift));
} 

//CHECK#3
obj.length = {valueOf: function() {return 3}, toString: function() {return {}}};
var unshift = obj.unshift();
if (unshift !== 3) {
  $ERROR('#1:  obj.length = {valueOf: function() {return 3}, toString: function() {return {}}}  obj.unshift() === 3. Actual: ' + (unshift));
}

//CHECK#4
try {  
  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}};
  var unshift = obj.unshift();  
  if (unshift !== 3) {
    $ERROR('#4.1:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.unshift() === ",". Actual: ' + (unshift));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.unshift() not throw "error"');
  } else {
    $ERROR('#4.3:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.unshift() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
obj.length = {toString: function() {return 1}};
var unshift = obj.unshift();  
if (unshift !== 1) {
  $ERROR('#5:  obj.length = {toString: function() {return 1}}  obj.unshift() === 1. Actual: ' + (unshift));
}

//CHECK#6
obj.length = {valueOf: function() {return {}}, toString: function() {return 1}}
var unshift = obj.unshift();  
if (unshift !== 1) {
  $ERROR('#6:  obj.length = {valueOf: function() {return {}}, toString: function() {return 1}}  obj.unshift() === 1. Actual: ' + (unshift));
}

//CHECK#7
try {
  
  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}};  
  var unshift = obj.unshift();
  $ERROR('#7.1:  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; obj.unshift() throw "error". Actual: ' + (unshift));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2:  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; obj.unshift() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  
  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  var unshift = obj.unshift();
  $ERROR('#8.1:  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.unshift() throw TypeError. Actual: ' + (unshift));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2:  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.unshift() throw TypeError. Actual: ' + (e));
  } 
}

