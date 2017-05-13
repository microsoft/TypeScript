// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Catching system exceptions of different types with try statement
 *
 * @path ch12/12.14/S12.14_A19_T1.js
 * @description Testing try/catch syntax construction
 */

// CHECK#1
try{
  throw (Error("hello"));
}
catch(e){
  if (e.toString()!=="Error: hello") $ERROR('#1: Exception.toString()==="Error: hello". Actual: Exception is '+e);
}

// CHECK#2
try{
  throw (new Error("hello"));
}
catch(e){
  if (e.toString()!=="Error: hello") $ERROR('#2: Exception.toString()==="Error: hello". Actual: Exception is '+e);
}

// CHECK#3
var c3=0;
try{
  throw EvalError(1);
}
catch(e){
  if (e.toString()!=="EvalError: 1") $ERROR('#3: Exception.toString()==="EvalError: 1". Actual: Exception is '+e);
}

// CHECK#4
try{
  throw RangeError(1);
}
catch(e){
  if (e.toString()!=="RangeError: 1") $ERROR('#4: Exception.toString()==="RangeError: 1". Actual: Exception is '+e);
}

// CHECK#5
try{
  throw ReferenceError(1);
}
catch(e){
  if (e.toString()!=="ReferenceError: 1") $ERROR('#5: Exception.toString()==="ReferenceError: 1". Actual: Exception is '+e);
}

// CHECK#6
var c6=0;
try{
  throw TypeError(1);
}
catch(e){
  if (e.toString()!=="TypeError: 1") $ERROR('#6: Exception.toString()==="TypeError: 1". Actual: Exception is '+e);
}

// CHECK#7
try{
  throw URIError("message", "fileName", "1"); 
}
catch(e){
  if (e.toString()!=="URIError: message") $ERROR('#7: Exception.toString()==="URIError: message". Actual: Exception is '+e);
}

