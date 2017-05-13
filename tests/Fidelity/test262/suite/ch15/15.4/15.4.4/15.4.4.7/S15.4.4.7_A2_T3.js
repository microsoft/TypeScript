// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The push function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A2_T3.js
 * @description Operator use ToNumber from length.
 * If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

var obj = {};
obj.push = Array.prototype.push;

//CHECK#1
obj.length = {valueOf: function() {return 3}};
var push = obj.push();
if (push !== 3) {
  $ERROR('#1:  obj.length = {valueOf: function() {return 3}}  obj.push() === 3. Actual: ' + (push));
}

//CHECK#2
obj.length = {valueOf: function() {return 3}, toString: function() {return 1}};
var push = obj.push();
if (push !== 3) {
  $ERROR('#0:  obj.length = {valueOf: function() {return 3}, toString: function() {return 1}}  obj.push() === 3. Actual: ' + (push));
} 

//CHECK#3
obj.length = {valueOf: function() {return 3}, toString: function() {return {}}};
var push = obj.push();
if (push !== 3) {
  $ERROR('#1:  obj.length = {valueOf: function() {return 3}, toString: function() {return {}}}  obj.push() === 3. Actual: ' + (push));
}

//CHECK#4
try {  
  
  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}};  
  var push = obj.push();
if (push !== 3) {
    $ERROR('#4.1:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.push() === ",". Actual: ' + (push));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.push() not throw "error"');
  } else {
    $ERROR('#4.3:  obj.length = {valueOf: function() {return 3}, toString: function() {throw "error"}}; obj.push() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
obj.length = {toString: function() {return 1}};
var push = obj.push();
if (push !== 1) {
  $ERROR('#5:  obj.length = {toString: function() {return 1}}  obj.push() === 1. Actual: ' + (push));
}

//CHECK#6
obj.length = {valueOf: function() {return {}}, toString: function() {return 1}}
var push = obj.push();
if (push !== 1) {
  $ERROR('#6:  obj.length = {valueOf: function() {return {}}, toString: function() {return 1}}  obj.push() === 1. Actual: ' + (push));
}

//CHECK#7
try {
  
  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}};  
  var push = obj.push();
  $ERROR('#7.1:  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; obj.push() throw "error". Actual: ' + (push));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2:  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; obj.push() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  
  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  var push = obj.push();
  $ERROR('#8.1:  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.push() throw TypeError. Actual: ' + (push));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2:  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.push() throw TypeError. Actual: ' + (e));
  } 
}

