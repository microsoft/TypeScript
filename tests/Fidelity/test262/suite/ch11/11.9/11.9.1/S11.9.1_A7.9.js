// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is primitive type and Type(y) is Object,
 * return x == ToPrimitive(y)
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A7.9.js
 * @description y is object, x is primtitive
 */

//CHECK#1
if ((true == {valueOf: function() {return 1}}) !== true) {
  $ERROR('#1: (true == {valueOf: function() {return 1}}) === true');
}

//CHECK#2
if ((1 == {valueOf: function() {return 1}, toString: function() {return 0}}) !== true) {
  $ERROR('#2: (1 == {valueOf: function() {return 1}, toString: function() {return 0}}) === true');
}

//CHECK#3
if (("+1" == {valueOf: function() {return 1}, toString: function() {return {}}}) !== true) {
  $ERROR('#3: ("+1" == {valueOf: function() {return 1}, toString: function() {return {}}}) === true');
} 
  
//CHECK#4
try {
  if ((true == {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) !== true) {
    $ERROR('#4.1: (true == {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) === true');
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: (true == {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) not throw "error"');
  } else {
    $ERROR('#4.3: (true == {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
if ((1 == {toString: function() {return "+1"}}) !== true) {
  $ERROR('#5: (1 == {toString: function() {return "+1"}}) === true');
}

//CHECK#6
if (("1" == {valueOf: function() {return {}}, toString: function() {return "+1"}}) !== false) {
  $ERROR('#6.1: ("1" == {valueOf: function() {return {}}, toString: function() {return "+1"}}) === false');
} else {
  if (("+1" == {valueOf: function() {return {}}, toString: function() {return "+1"}}) !== true) {
    $ERROR('#6.2: ("+1" == {valueOf: function() {return {}}, toString: function() {return "+1"}}) === true');
  }
}

//CHECK#7
try {
  (1 == {valueOf: function() {throw "error"}, toString: function() {return 1}});
  $ERROR('#7.1: (1 == {valueOf: function() {throw "error"}, toString: function() {return 1}}) throw "error". Actual: ' + ((1 == {valueOf: function() {throw "error"}, toString: function() {return 1}})));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: (1 == {valueOf: function() {throw "error"}, toString: function() {return 1}}) throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  (1 == {valueOf: function() {return {}}, toString: function() {return {}}});
  $ERROR('#8.1: (1 == {valueOf: function() {return {}}, toString: function() {return {}}}) throw TypeError. Actual: ' + ((1 == {valueOf: function() {return {}}, toString: function() {return {}}})));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: (1 == {valueOf: function() {return {}}, toString: function() {return {}}}) throw TypeError. Actual: ' + (e));
  } 
}

