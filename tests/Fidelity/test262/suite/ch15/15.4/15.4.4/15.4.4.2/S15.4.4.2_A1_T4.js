// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of calling this function is the same as if
 * the built-in join method were invoked for this object with no argument
 *
 * @path ch15/15.4/15.4.4/15.4.4.2/S15.4.4.2_A1_T4.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, String)
 */

//CHECK#1
var object = {valueOf: function() {return "+"}};
var x = new Array(object);
if (x.toString() !== x.join()) {
  $ERROR('#1.1: var object = {valueOf: function() {return "+"}} var x = new Array(object); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "[object Object]") {
    $ERROR('#1.2: var object = {valueOf: function() {return "+"}} var x = new Array(object); x.toString() === "[object Object]". Actual: ' + (x.toString()));
  }
}

//CHECK#2
var object = {valueOf: function() {return "+"}, toString: function() {return "*"}};
var x = new Array(object);
if (x.toString() !== x.join()) {
  $ERROR('#2.1: var object = {valueOf: function() {return "+"}, toString: function() {return x.join()}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "*") {
    $ERROR('#2.2: var object = {valueOf: function() {return "+"}, toString: function() {return "*"}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
  } 
} 

//CHECK#3
var object = {valueOf: function() {return "+"}, toString: function() {return {}}};
var x = new Array(object);
if (x.toString() !== x.join()) {
  $ERROR('#3.1: var object = {valueOf: function() {return x.join()}, toString: function() {return {}}} var x = new Array(object); x.toString() === "+". Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "+") {
    $ERROR('#3.2: var object = {valueOf: function() {return "+"}, toString: function() {return {}}} var x = new Array(object); x.toString() === "+". Actual: ' + (x.toString()));
  }
}

//CHECK#4
try {
  var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}};
  var x = new Array(object);
  if (x.toString() !== x.join()) {
    $ERROR('#4.1: var object = {valueOf: function() {throw "error"}, toString: function() {return x.join()}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
  } else {
    if (x.toString() !== "*") {
      $ERROR('#4.2: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
    }
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.3: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}} var x = new Array(object); x.toString() not throw "error"');
  } else {
    $ERROR('#4.4: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}} var x = new Array(object); x.toString() not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
var object = {toString: function() {return "*"}};
var x = new Array(object);
if (x.toString() !== x.join()) {
  $ERROR('#5.1: var object = {toString: function() {return x.join()}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "*") {
    $ERROR('#5.2: var object = {toString: function() {return "*"}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
  }
}

//CHECK#6
var object = {valueOf: function() {return {}}, toString: function() {return "*"}}
var x = new Array(object);
if (x.toString() !== x.join()) {
  $ERROR('#6.1: var object = {valueOf: function() {return {}}, toString: function() {return x.join()}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "*") {
    $ERROR('#6.2: var object = {valueOf: function() {return {}}, toString: function() {return "*"}} var x = new Array(object); x.toString() === "*". Actual: ' + (x.toString()));
  }
}

//CHECK#7
try {
  var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}};
  var x = new Array(object);
  x.toString();
  $ERROR('#7.1: var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}} var x = new Array(object); x.toString() throw "error". Actual: ' + (x.toString()));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}} var x = new Array(object); x.toString() throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  var x = new Array(object);
  x.toString();
  $ERROR('#8.1: var object = {valueOf: function() {return {}}, toString: function() {return {}}} var x = new Array(object); x.toString() throw TypeError. Actual: ' + (x.toString()));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: var object = {valueOf: function() {return {}}, toString: function() {return {}}} var x = new Array(object); x.toString() throw TypeError. Actual: ' + (e));
  } 
}

