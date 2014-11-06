// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString from array arguments
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A3.2_T1.js
 * @description Checking arguments and separator in ["", "\\", "&", true, Infinity, null, undefind, NaN]
 */

//CHECK#0
var x = new Array("","","");
if (x.join("") !== "") {
  $ERROR('#0: var x = new Array("","",""); x.join("") === "". Actual: ' + (x.join("")));
}

//CHECK#1
var x = new Array("\\","\\","\\");
if (x.join("\\") !== "\\\\\\\\\\") {
  $ERROR('#1: var x = new Array("\\","\\","\\"); x.join("\\") === "\\\\\\\\\\". Actual: ' + (x.join("\\")));
}

//CHECK#2
var x = new Array("&", "&", "&");
if (x.join("&") !== "&&&&&") {
  $ERROR('#2: var x = new Array("&", "&", "&"); x.join("&") === "&&&&&". Actual: ' + (x.join("&")));
}

//CHECK#3
var x = new Array(true,true,true);
if (x.join() !== "true,true,true") {
  $ERROR('#3: var x = new Array(true,true,true); x.join(true,true,true) === "true,true,true". Actual: ' + (x.join(true,true,true)));
}

//CHECK#4
var x = new Array(null,null,null);
if (x.join() !== ",,") {
  $ERROR('#4: var x = new Array(null,null,null); x.join(null,null,null) === ",,". Actual: ' + (x.join(null,null,null)));
}

//CHECK#5
var x = new Array(undefined,undefined,undefined);
if (x.join() !== ",,") {
  $ERROR('#5: var x = new Array(undefined,undefined,undefined); x.join(undefined,undefined,undefined) === ",,". Actual: ' + (x.join(undefined,undefined,undefined)));
}

//CHECK#6
var x = new Array(Infinity,Infinity,Infinity);
if (x.join() !== "Infinity,Infinity,Infinity") {
  $ERROR('#6: var x = new Array(Infinity,Infinity,Infinity); x.join(Infinity,Infinity,Infinity) === "Infinity,Infinity,Infinity". Actual: ' + (x.join(Infinity,Infinity,Infinity)));
}

//CHECK#7
var x = new Array(NaN,NaN,NaN);
if (x.join() !== "NaN,NaN,NaN") {
  $ERROR('#7: var x = new Array(NaN,NaN,NaN); x.join(NaN,NaN,NaN) === "NaN,NaN,NaN". Actual: ' + (x.join(NaN,NaN,NaN)));
}

