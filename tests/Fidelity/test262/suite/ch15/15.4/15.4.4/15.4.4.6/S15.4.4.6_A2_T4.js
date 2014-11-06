// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The pop function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.6/S15.4.4.6_A2_T4.js
 * @description Operator use ToNumber from length.
 * If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

var obj = {};
obj.pop = Array.prototype.pop;

//CHECK#1
obj[0] = -1;
obj.length = {valueOf: function() {return 1}};
var pop = obj.pop();
if (pop !== -1) {
  $ERROR('#1: obj[0] = -1; obj.length = {valueOf: function() {return 1}}  obj.pop() === -1. Actual: ' + (pop));
}

//CHECK#2
obj[0] = -1;
obj.length = {valueOf: function() {return 1}, toString: function() {return 0}};
var pop = obj.pop();
if (pop !== -1) {
  $ERROR('#0: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {return 0}}  obj.pop() === -1. Actual: ' + (pop));
} 

//CHECK#3
obj[0] = -1;
obj.length = {valueOf: function() {return 1}, toString: function() {return {}}};
var pop = obj.pop();
if (pop !== -1) {
  $ERROR('#3: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {return {}}}  obj.pop() === -1. Actual: ' + (pop));
}

//CHECK#4
try {  
  obj[0] = -1;
  obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}};  
  var pop = obj.pop();
if (pop !== -1) {
    $ERROR('#4.1: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.pop() === ",". Actual: ' + (pop));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.pop() not throw "error"');
  } else {
    $ERROR('#4.3: obj[0] = -1; obj.length = {valueOf: function() {return 1}, toString: function() {throw "error"}}; obj.pop() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
obj[0] = -1;
obj.length = {toString: function() {return 0}};
var pop = obj.pop();
if (pop !== undefined) {
  $ERROR('#5: obj[0] = -1; obj.length = {toString: function() {return 0}}  obj.pop() === undefined. Actual: ' + (pop));
}

//CHECK#6
obj[0] = -1;
obj.length = {valueOf: function() {return {}}, toString: function() {return 0}}
var pop = obj.pop();
if (pop !== undefined) {
  $ERROR('#6: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return 0}}  obj.pop() === undefined. Actual: ' + (pop));
}

//CHECK#7
try {
  obj[0] = -1;
  obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}};  
  var pop = obj.pop();
  $ERROR('#7.1: obj[0] = -1; obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}}; obj.pop() throw "error". Actual: ' + (pop));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: obj[0] = -1; obj.length = {valueOf: function() {throw "error"}, toString: function() {return 0}}; obj.pop() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  obj[0] = -1;
  obj.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  var pop = obj.pop();
  $ERROR('#8.1: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.pop() throw TypeError. Actual: ' + (pop));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: obj[0] = -1; obj.length = {valueOf: function() {return {}}, toString: function() {return {}}}  obj.pop() throw TypeError. Actual: ' + (e));
  } 
}

