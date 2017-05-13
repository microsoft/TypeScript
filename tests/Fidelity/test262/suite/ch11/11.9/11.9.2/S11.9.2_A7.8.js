// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is Object and Type(y) is primitive type,
 * return ToPrimitive(x) != y
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A7.8.js
 * @description x is object, y is primtitive
 */

//CHECK#1
if ((true != {valueOf: function() {return 1}}) !== false) {
  $ERROR('#1: (true != {valueOf: function() {return 1}}) === false');
}

//CHECK#2
if ((1 != {valueOf: function() {return 1}, toString: function() {return 0}}) !== false) {
  $ERROR('#2: (1 != {valueOf: function() {return 1}, toString: function() {return 0}}) === false');
}

//CHECK#3
if (("+1" != {valueOf: function() {return 1}, toString: function() {return {}}}) !== false) {
  $ERROR('#3: ("+1" != {valueOf: function() {return 1}, toString: function() {return {}}}) === false');
} 
  
//CHECK#4
try {
  if ((true != {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) !== false) {
    $ERROR('#4.1: (true != {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) === false');
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: (true != {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) not throw "error"');
  } else {
    $ERROR('#4.3: (true != {valueOf: function() {return "+1"}, toString: function() {throw "error"}}) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
if ((1 != {toString: function() {return "+1"}}) !== false) {
  $ERROR('#5: (1 != {toString: function() {return "+1"}}) === false');
}

//CHECK#6
if (("1" != {valueOf: function() {return {}}, toString: function() {return "+1"}}) !== true) {
  $ERROR('#6.1: ("1" != {valueOf: function() {return {}}, toString: function() {return "+1"}}) === true');
} else {
  if (("+1" != {valueOf: function() {return {}}, toString: function() {return "+1"}}) !== false) {
    $ERROR('#6.2: ("+1" != {valueOf: function() {return {}}, toString: function() {return "+1"}}) === false');
  }
}

//CHECK#7
try {
  (1 != {valueOf: function() {throw "error"}, toString: function() {return 1}});
  $ERROR('#7: (1 != {valueOf: function() {throw "error"}, toString: function() {return 1}}) throw "error"');
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7: (1 != {valueOf: function() {throw "error"}, toString: function() {return 1}}) throw "error"');
  } 
}

//CHECK#8
try {
  (1 != {valueOf: function() {return {}}, toString: function() {return {}}});
  $ERROR('#8: (1 != {valueOf: function() {return {}}, toString: function() {return {}}}) throw TypeError');
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8: (1 != {valueOf: function() {return {}}, toString: function() {return {}}}) throw TypeError');
  } 
}

