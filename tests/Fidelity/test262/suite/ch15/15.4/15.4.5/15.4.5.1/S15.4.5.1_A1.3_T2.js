// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Set the value of property length of A to Uint32(length)
 *
 * @path ch15/15.4/15.4.5/15.4.5.1/S15.4.5.1_A1.3_T2.js
 * @description Uint32 use ToNumber and ToPrimitve
 */

//CHECK#1
var x = [];
x.length = {valueOf: function() {return 2}};
if (x.length !== 2) {
  $ERROR('#1: x = []; x.length = {valueOf: function() {return 2}};  x.length === 2. Actual: ' + (x.length));
}

//CHECK#2
x = [];
x.length = {valueOf: function() {return 2}, toString: function() {return 1}};
if (x.length !== 2) {
  $ERROR('#0: x = []; x.length = {valueOf: function() {return 2}, toString: function() {return 1}};  x.length === 2. Actual: ' + (x.length));
} 

//CHECK#3
x = [];
x.length = {valueOf: function() {return 2}, toString: function() {return {}}};
if (x.length !== 2) {
  $ERROR('#3: x = []; x.length = {valueOf: function() {return 2}, toString: function() {return {}}};  x.length === 2. Actual: ' + (x.length));
}

//CHECK#4
try {  
  x = [];
  x.length = {valueOf: function() {return 2}, toString: function() {throw "error"}};  
  if (x.length !== 2) {
    $ERROR('#4.1: x = []; x.length = {valueOf: function() {return 2}, toString: function() {throw "error"}}; x.length === ",". Actual: ' + (x.length));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: x = []; x.length = {valueOf: function() {return 2}, toString: function() {throw "error"}}; x.length not throw "error"');
  } else {
    $ERROR('#4.3: x = []; x.length = {valueOf: function() {return 2}, toString: function() {throw "error"}}; x.length not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
x = [];
x.length = {toString: function() {return 1}};
if (x.length !== 1) {
  $ERROR('#5: x = []; x.length = {toString: function() {return 1}};  x.length === 1. Actual: ' + (x.length));
}

//CHECK#6
x = [];
x.length = {valueOf: function() {return {}}, toString: function() {return 1}}
if (x.length !== 1) {
  $ERROR('#6: x = []; x.length = {valueOf: function() {return {}}, toString: function() {return 1}};  x.length === 1. Actual: ' + (x.length));
}

//CHECK#7
try {
  x = [];
  x.length = {valueOf: function() {throw "error"}, toString: function() {return 1}};  
  x.length;
  $ERROR('#7.1: x = []; x.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; x.length throw "error". Actual: ' + (x.length));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: x = []; x.length = {valueOf: function() {throw "error"}, toString: function() {return 1}}; x.length throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  x = [];
  x.length = {valueOf: function() {return {}}, toString: function() {return {}}};
  x.length;
  $ERROR('#8.1: x = []; x.length = {valueOf: function() {return {}}, toString: function() {return {}}}  x.length throw TypeError. Actual: ' + (x.length));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: x = []; x.length = {valueOf: function() {return {}}, toString: function() {return {}}}  x.length throw TypeError. Actual: ' + (e));
  } 
}

