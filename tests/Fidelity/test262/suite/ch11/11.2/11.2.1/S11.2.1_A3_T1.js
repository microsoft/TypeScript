// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * MemberExpression calls ToObject(MemberExpression) and ToString(Expression). CallExpression calls ToObject(CallExpression) and ToString(Expression)
 *
 * @path ch11/11.2/11.2.1/S11.2.1_A3_T1.js
 * @description Checking Boolean case
 */

//CHECK#1
if (true.toString() !== "true") {
  $ERROR('#1: true.toString() === "true". Actual: ' + (true.toString()));
}

//CHECK#2
if (false["toString"]() !== "false") {
  $ERROR('#2: false["toString"]() === "false". Actual: ' + (false["toString"]()));
}

//CHECK#3
if (new Boolean(true).toString() !== "true") {
  $ERROR('#3: new Boolean(true).toString() === "true". Actual: ' + (new Boolean(true).toString()));
}

//CHECK#4
if (new Boolean(false)["toString"]() !== "false") {
  $ERROR('#4: new Boolean(false)["toString"]() === "false". Actual: ' + (new Boolean(false)["toString"]()));
}  

