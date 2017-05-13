// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x | y uses [[Default Value]]
 *
 * @path ch11/11.10/11.10.3/S11.10.3_A2.2_T1.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

//CHECK#1
if (({valueOf: function() {return 1}} | 0) !== 1) {
  $ERROR('#1: ({valueOf: function() {return 1}} | 0) === 1. Actual: ' + (({valueOf: function() {return 1}} | 0)));
}

//CHECK#2
if (({valueOf: function() {return 1}, toString: function() {return 0}} | 0) !== 1) {
  $ERROR('#2: ({valueOf: function() {return 1}, toString: function() {return 0}} | 0) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {return 0}} | 0)));
}

//CHECK#3
if (({valueOf: function() {return 1}, toString: function() {return {}}} | 0) !== 1) {
  $ERROR('#3: ({valueOf: function() {return 1}, toString: function() {return {}}} | 0) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {return {}}} | 0)));
}

//CHECK#4
try {
  if (({valueOf: function() {return 1}, toString: function() {throw "error"}} | 0) !== 1) {
    $ERROR('#4.1: ({valueOf: function() {return 1}, toString: function() {throw "error"}} | 0) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {throw "error"}} | 0)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: ({valueOf: function() {return 1}, toString: function() {throw "error"}} | 0) not throw "error"');
  } else {
    $ERROR('#4.3: ({valueOf: function() {return 1}, toString: function() {throw "error"}} | 0) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
if ((0 | {toString: function() {return 1}}) !== 1) {
  $ERROR('#5: (0 | {toString: function() {return 1}}) === 1. Actual: ' + ((0 | {toString: function() {return 1}})));
}

//CHECK#6
if ((0 | {valueOf: function() {return {}}, toString: function() {return 1}}) !== 1) {
  $ERROR('#6: (0 | {valueOf: function() {return {}}, toString: function() {return 1}}) === 1. Actual: ' + ((0 | {valueOf: function() {return {}}, toString: function() {return 1}})));
}

//CHECK#7
try {
  0 | {valueOf: function() {throw "error"}, toString: function() {return 1}};
  $ERROR('#7.1: 0 | {valueOf: function() {throw "error"}, toString: function() {return 1}} throw "error". Actual: ' + (0 | {valueOf: function() {throw "error"}, toString: function() {return 1}}));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: 0 | {valueOf: function() {throw "error"}, toString: function() {return 1}} throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  0 | {valueOf: function() {return {}}, toString: function() {return {}}};
  $ERROR('#8.1: 0 | {valueOf: function() {return {}}, toString: function() {return {}}} throw TypeError. Actual: ' + (0 | {valueOf: function() {return {}}, toString: function() {return {}}}));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: 0 | {valueOf: function() {return {}}, toString: function() {return {}}} throw TypeError. Actual: ' + (e));
  } 
}

