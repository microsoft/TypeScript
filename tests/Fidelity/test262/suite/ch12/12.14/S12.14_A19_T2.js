// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Catching system exceptions of different types with try statement
 *
 * @path ch12/12.14/S12.14_A19_T2.js
 * @description Testing try/catch/finally syntax construction
 */

var fin=0;
// CHECK#1
try{
  throw (Error("hello"));
}
catch(e){
  if (e.toString()!=="Error: hello") $ERROR('#1.1: Exception.toString()==="Error: hello". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#1.2: "finally" block must be evaluated'); 

// CHECK#2
fin=0;
try{
  throw (new Error("hello"));
}
catch(e){
  if (e.toString()!=="Error: hello") $ERROR('#2.1: Exception.toString()==="Error: hello". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#2.2: "finally" block must be evaluated'); 

// CHECK#3
fin=0;
var c3=0;
try{
  throw EvalError(1);
}
catch(e){
  if (e.toString()!=="EvalError: 1") $ERROR('#3.1: Exception.toString()==="EvalError: 1". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#3.2: "finally" block must be evaluated'); 

// CHECK#4
fin=0;
try{
  throw RangeError(1);
}
catch(e){
  if (e.toString()!=="RangeError: 1") $ERROR('#4.1: Exception.toString()==="RangeError: 1". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#4.2: "finally" block must be evaluated'); 

// CHECK#5
fin=0;
try{
  throw ReferenceError(1);
}
catch(e){
  if (e.toString()!=="ReferenceError: 1") $ERROR('#5.1: Exception.toString()==="ReferenceError: 1". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#5.2: "finally" block must be evaluated'); 

// CHECK#6
fin=0;
try{
  throw TypeError(1);
}
catch(e){
  if (e.toString()!=="TypeError: 1") $ERROR('#6.1: Exception.toString()==="TypeError: 1". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#6.2: "finally" block must be evaluated'); 

// CHECK#7
fin=0;
try{
  throw URIError("message", "fileName", "1"); 
}
catch(e){
  if (e.toString()!=="URIError: message") $ERROR('#7.1: Exception.toString()==="URIError: message". Actual: Exception is '+e);
}
finally{
  fin=1;
}
if (fin!==1) $ERROR('#7.2: "finally" block must be evaluated'); 

