// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If argArray is either an array or an arguments object,
 * the function is passed the (ToUint32(argArray.length)) arguments argArray[0], argArray[1],...,argArray[ToUint32(argArray.length)-1]
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A7_T9.js
 * @description argArray is (empty object, arguments), inside function declaration used
 */

function FACTORY(){
  var obj = {};
  Function("a1,a2,a3","this.shifted=a1+a2+a3;").apply(obj,arguments);
  return obj;
}

obj=new FACTORY("",1,2);

//CHECK#1
if (typeof this["shifted"] !== "undefined") {
  $ERROR('#1: If argArray is either an array or an arguments object, the function is passed the...');
}

//CHECK#2
if (obj.shifted !== "12") {
  $ERROR('#2: If argArray is either an array or an arguments object, the function is passed the...');
}


