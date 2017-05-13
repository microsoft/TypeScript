// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The shift function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A2_T5.js
 * @description Operator use ToNumber from length.
 * If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

var obj = {};
obj.shift = Array.prototype.shift;

//CHECK#1
obj[0] = -1;
obj.length = {valueOf: function() {return 1}};
var shift = obj.shift();
if (shift !== -1) {
  $ERROR('#1: obj[0] = -1; obj.length = {valueOf: function() {return 1}}  obj.shift() === -1. Actual: ' + (shift));
}

//CHECK#2
obj[0] = -1;
obj.length = {valueOf: function() {return 1}, toString: function() {return 0}};
var shift = obj.shift();
if (shift !== -1) {
  $ERROR('#0: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {return 0}}  obj.shift() === -1. Actual: ' + (shift));
} 

//CHECK#3
obj[0] = -1;
obj.length = {valueOf: function() {return 1}, toString: function() {return {}}};
var shift = obj.shift();
if (shift !== -1) {
  $ERROR('#3: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {return {}}}  obj.shift() === -1. Actual: ' + (shift));
}

//CHECK#4
try {  
  obj[0] = -1;
  obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}};  
  var shift = obj.shift();
if (shift !== -1) {
    $ERROR('#4.1: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.shift() === ",". Actual: ' + (shift));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.shift() not throw "error"');
  } else {
    $ERROR('#4.3: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.shift() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
obj[0] = -1;
obj.length = {toString: function() {return 0}};
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#5: obj[0] = -1; obj.length = {toString: function() {return 0}}  obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#6
obj[0] = -1;
obj.length = {valueOf: function() {return {}}, toString: function() {return 0}}
var shift = obj.shift();
if (shift !== undefined) {
  $ERROR('#6: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return 0}}  obj.shift() === undefined. Actual: ' + (shift));
}

//CHECK#7
try {
  obj[0] = -1;
  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}};  
  var shift = obj.shift();
  $ERROR('#7.1: obj[0] = -1; obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}}; obj.shift() throw "error". Actual: ' + (shift));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: obj[0] = -1; obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}}; obj.shift() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  obj[0] = -1;
  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  var shift = obj.shift();
  $ERROR('#8.1: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.shift() throw TypeError. Actual: ' + (shift));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.shift() throw TypeError. Actual: ' + (e));
  } 
}

