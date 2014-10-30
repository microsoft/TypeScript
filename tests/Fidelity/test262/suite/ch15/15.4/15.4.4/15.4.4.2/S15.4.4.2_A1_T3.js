// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of calling this function is the same as if
 * the built-in join method were invoked for this object with no argument
 *
 * @path ch15/15.4/15.4.4/15.4.4.2/S15.4.4.2_A1_T3.js
 * @description Operator use ToString from array arguments
 */

//CHECK#0
var x = new Array("","","");
if (x.toString() !== x.join()) {
  $ERROR('#0.1: var x = new Array("","",""); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== ",,") {
    $ERROR('#0.2: var x = new Array("","",""); x.toString() === ",,". Actual: ' + (x.toString()));
  }
}

//CHECK#1
var x = new Array("\\","\\","\\");
if (x.toString() !== x.join()) {
  $ERROR('#1.1: var x = new Array("\\","\\","\\"); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "\\,\\,\\") {
    $ERROR('#1.2: var x = new Array("\\","\\","\\"); x.toString() === "\\,\\,\\". Actual: ' + (x.toString()));
  } 
}

//CHECK#2
var x = new Array("&", "&", "&");
if (x.toString() !== x.join()) {
  $ERROR('#2.1: var x = new Array("&", "&", "&"); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "&,&,&") {
    $ERROR('#2.2: var x = new Array("&", "&", "&"); x.toString() === "&,&,&". Actual: ' + (x.toString()));
  }
}

//CHECK#3
var x = new Array(true,true,true);
if (x.toString() !== x.join()) {
  $ERROR('#3.1: var x = new Array(true,true,true); x.toString(true,true,true) === x.join(). Actual: ' + (x.toString(true,true,true)));
} else {
  if (x.toString() !== "true,true,true") {
    $ERROR('#3.2: var x = new Array(true,true,true); x.toString(true,true,true) === "true,true,true". Actual: ' + (x.toString(true,true,true)));
  }
}

//CHECK#4
var x = new Array(null,null,null);
if (x.toString() !== x.join()) {
  $ERROR('#4.1: var x = new Array(null,null,null); x.toString(null,null,null) === x.join(). Actual: ' + (x.toString(null,null,null)));
} else {
  if (x.toString() !== ",,") {
    $ERROR('#4.2: var x = new Array(null,null,null); x.toString(null,null,null) === ",,". Actual: ' + (x.toString(null,null,null)));
  }
}

//CHECK#5
var x = new Array(undefined,undefined,undefined);
if (x.toString() !== x.join()) {
  $ERROR('#5.1: var x = new Array(undefined,undefined,undefined); x.toString(undefined,undefined,undefined) === x.join(). Actual: ' + (x.toString(undefined,undefined,undefined)));
} else {
  if (x.toString() !== ",,") {
    $ERROR('#5.2: var x = new Array(undefined,undefined,undefined); x.toString(undefined,undefined,undefined) === ",,". Actual: ' + (x.toString(undefined,undefined,undefined)));
  }
}

//CHECK#6
var x = new Array(Infinity,Infinity,Infinity);
if (x.toString() !== x.join()) {
  $ERROR('#6.1: var x = new Array(Infinity,Infinity,Infinity); x.toString(Infinity,Infinity,Infinity) === x.join(). Actual: ' + (x.toString(Infinity,Infinity,Infinity)));
} else {
  if (x.toString() !== "Infinity,Infinity,Infinity") {
    $ERROR('#6.2: var x = new Array(Infinity,Infinity,Infinity); x.toString(Infinity,Infinity,Infinity) === "Infinity,Infinity,Infinity". Actual: ' + (x.toString(Infinity,Infinity,Infinity)));
  }
}

//CHECK#7
var x = new Array(NaN,NaN,NaN);
if (x.toString() !== x.join()) {
  $ERROR('#7.1: var x = new Array(NaN,NaN,NaN); x.toString(NaN,NaN,NaN) === x.join(). Actual: ' + (x.toString(NaN,NaN,NaN)));
} else {
  if (x.toString() !== "NaN,NaN,NaN") {
    $ERROR('#7.2: var x = new Array(NaN,NaN,NaN); x.toString(NaN,NaN,NaN) === "NaN,NaN,NaN". Actual: ' + (x.toString(NaN,NaN,NaN)));
  }
}   

