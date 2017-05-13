// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A property name P (in the form of a string value) is an array index
 * if and only if ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal to 2^32 - 1
 *
 * @path ch15/15.4/S15.4_A1.1_T9.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, String)
 */

//CHECK#1
x = [];
var object = {valueOf: function() {return 1}};
x[object] = 0;
if (x["[object Object]"] !== 0) {
  $ERROR('#1: x = []; var object = {valueOf: function() {return 1}}; x[object] = 0; x["[object Object]"] === 0. Actual: ' + (x["[object Object]"]));
}

//CHECK#2
x = [];
var object = {valueOf: function() {return 1}, toString: function() {return 0}};
x[object] = 0;
if (x[0] !== 0) {
  $ERROR('#2: x = []; var object = {valueOf: function() {return 1}, toString: function() {return 0}}; x[object] = 0; x[0] === 0. Actual: ' + (x[0]));
} 

//CHECK#3
x = [];
var object = {valueOf: function() {return 1}, toString: function() {return {}}};
x[object] = 0;
if (x[1] !== 0) {
  $ERROR('#3: x = []; var object = {valueOf: function() {return 1}, toString: function() {return {}}}; x[object] = 0; x[1] === 0. Actual: ' + (x[1]));
}

//CHECK#4
try {
  x = [];  
  var object = {valueOf: function() {throw "error"}, toString: function() {return 1}};
  x[object] = 0;
  if (x[1] !== 0) {
    $ERROR('#4.1: x = []; var object = {valueOf: function() {throw "error"}, toString: function() {return 1}}; x[object] = 0; x[1] === 1. Actual: ' + (x[1]));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: x = []; var object = {valueOf: function() {throw "error"}, toString: function() {return 1}}; x[object] = 0; x[1] === 1. Actual: ' + ("error"));
  } else {
    $ERROR('#4.3: x = []; var object = {valueOf: function() {throw "error"}, toString: function() {return 1}}; x[object] = 0; x[1] === 1. Actual: ' + (e));
  }
}

//CHECK#5
x = [];
var object = {toString: function() {return 1}};
x[object] = 0;
if (x[1] !== 0) {
  $ERROR('#5: x = []; var object = {toString: function() {return 1}}; x[object] = 0; x[1] === 0. Actual: ' + (x[1]));
}

//CHECK#6
x = [];
var object = {valueOf: function() {return {}}, toString: function() {return 1}}
x[object] = 0;
if (x[1] !== 0) {
  $ERROR('#6: x = []; var object = {valueOf: function() {return {}}, toString: function() {return 1}}; x[object] = 0; x[1] === 0. Actual: ' + (x[1]));
}

//CHECK#7
try {
  x = [];
  var object = {valueOf: function() {return 1}, toString: function() {throw "error"}};
  x[object];  
  $ERROR('#7.1: x = []; var object = {valueOf: function() {return 1}, toString: function() {throw "error"}}; x[object] throw "error". Actual: ' + (x[object]));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: x = []; var object = {valueOf: function() {return 1}, toString: function() {throw "error"}}; x[object] throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  x = [];
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  x[object];
  $ERROR('#8.1: x = []; var object = {valueOf: function() {return {}}, toString: function() {return {}}}; x[object] throw TypeError. Actual: ' + (x[object]));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: x = []; var object = {valueOf: function() {return {}}, toString: function() {return {}}}; x[object] throw TypeError. Actual: ' + (e));
  } 
}  

