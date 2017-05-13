// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString from separator
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A3.1_T2.js
 * @description If Type(separator) is Object, evaluate ToPrimitive(separator, String)
 */

var x = new Array(0,1,2,3);
//CHECK#1
var object = {valueOf: function() {return "+"}};
if (x.join(object) !== "0[object Object]1[object Object]2[object Object]3") {
  $ERROR('#1: var object = {valueOf: function() {return "+"}}; x.join(object) === "0[object Object]1[object Object]2[object Object]3". Actual: ' + (x.join(object)));
}

//CHECK#2
var object = {valueOf: function() {return "+"}, toString: function() {return "*"}};
if (x.join(object) !== "0*1*2*3") {
  $ERROR('#2: var object = {valueOf: function() {return "+"}, toString: function() {return "*"}}; x.join(object) === "0*1*2*3". Actual: ' + (x.join(object)));
} 

//CHECK#3
var object = {valueOf: function() {return "+"}, toString: function() {return {}}};
if (x.join(object) !== "0+1+2+3") {
  $ERROR('#3: var object = {valueOf: function() {return "+"}, toString: function() {return {}}}; x.join(object) === "0+1+2+3". Actual: ' + (x.join(object)));
}

//CHECK#4
try {
  var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}};
  if (x.join(object) !== "0*1*2*3") {
    $ERROR('#4.1: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}}; x.join(object) === "0*1*2*3". Actual: ' + (x.join(object)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}}; x.join(object) not throw "error"');
  } else {
    $ERROR('#4.3: var object = {valueOf: function() {throw "error"}, toString: function() {return "*"}}; x.join(object) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
var object = {toString: function() {return "*"}};
if (x.join(object) !== "0*1*2*3") {
  $ERROR('#5: var object = {toString: function() {return "*"}}; x.join(object) === "0*1*2*3". Actual: ' + (x.join(object)));
}

//CHECK#6
var object = {valueOf: function() {return {}}, toString: function() {return "*"}}
if (x.join(object) !== "0*1*2*3") {
  $ERROR('#6: var object = {valueOf: function() {return {}}, toString: function() {return "*"}}; x.join(object) === "0*1*2*3". Actual: ' + (x.join(object)));
}

//CHECK#7
try {
  var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}};
  x.join(object);
  $ERROR('#7.1: var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}}; x.join(object) throw "error". Actual: ' + (x.join(object)));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: var object = {valueOf: function() {return "+"}, toString: function() {throw "error"}}; x.join(object) throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  var object = {valueOf: function() {return {}}, toString: function() {return {}}};
  x.join(object);
  $ERROR('#8.1: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; x.join(object) throw TypeError. Actual: ' + (x.join(object)));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: var object = {valueOf: function() {return {}}, toString: function() {return {}}}; x.join(object) throw TypeError. Actual: ' + (e));
  } 
}

//CHECK#9
try {
    var object = {toString: function() {throw "error"}};
    [].join(object);
    $ERROR('#9.1: var object = {toString: function() {throw "error"}}; [].join(object) throw "error". Actual: ' + ([].join(object)));
}
catch (e) {
    if (e !== "error") {
        $ERROR('#9.2: var object = {toString: function() {throw "error"}}; [].join(object) throw "error". Actual: ' + (e));
   }
}