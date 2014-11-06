// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is primitive type and Type(y) is Object,
 * return x != ToPrimitive(y)
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A7.9.js
 * @description y is object, x is primtitive
 */

//CHECK#1
if (({valueOf: function() {return 1}} != true) !== false) {
  $ERROR('#1: ({valueOf: function() {return 1}} != true) === false');
}

//CHECK#2
if (({valueOf: function() {return 1}, toString: function() {return 0}} != 1) !== false) {
  $ERROR('#2: ({valueOf: function() {return 1}, toString: function() {return 0}} != 1) === false');
}

//CHECK#3
if (({valueOf: function() {return 1}, toString: function() {return {}}} != "+1") !== false) {
  $ERROR('#3: ({valueOf: function() {return 1}, toString: function() {return {}}} != "+1") === false');
} 
  
//CHECK#4
try {
  if (({valueOf: function() {return "+1"}, toString: function() {throw "error"}} != true) !== false) {
    $ERROR('#4.1: ({valueOf: function() {return "+1"}, toString: function() {throw "error"}} != true) === false');
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: ({valueOf: function() {return "+1"}, toString: function() {throw "error"}} != true) not throw "error"');
  } else {
    $ERROR('#4.3: ({valueOf: function() {return "+1"}, toString: function() {throw "error"}} != true) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
if (({toString: function() {return "+1"}} != 1) !== false) {
  $ERROR('#5: ({toString: function() {return "+1"}} != 1) === false');
}

//CHECK#6
if (({valueOf: function() {return {}}, toString: function() {return "+1"}} != "1") !== true) {
  $ERROR('#6.1: ({valueOf: function() {return {}}, toString: function() {return "+1"}} != "1") === true');
} else {
  if (({valueOf: function() {return {}}, toString: function() {return "+1"}} != "+1") !== false) {
    $ERROR('#6.2: ({valueOf: function() {return {}}, toString: function() {return "+1"}} != "+1") === false');
  }
}

//CHECK#7
try {
  ({valueOf: function() {throw "error"}, toString: function() {return 1}} != 1);
  $ERROR('#7.1: ({valueOf: function() {throw "error"}, toString: function() {return 1}} != 1) throw "error". Actual: ' + (({valueOf: function() {throw "error"}, toString: function() {return 1}} != 1)));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: ({valueOf: function() {throw "error"}, toString: function() {return 1}} != 1) throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  ({valueOf: function() {return {}}, toString: function() {return {}}} != 1);
  $ERROR('#8.1: ({valueOf: function() {return {}}, toString: function() {return {}}} != 1) throw TypeError. Actual: ' + (({valueOf: function() {return {}}, toString: function() {return {}}} != 1)));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: ({valueOf: function() {return {}}, toString: function() {return {}}} != 1) throw TypeError. Actual: ' + (e));
  } 
}

