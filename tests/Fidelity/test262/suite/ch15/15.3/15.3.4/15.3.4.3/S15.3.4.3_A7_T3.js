// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If argArray is either an array or an arguments object,
 * the function is passed the (ToUint32(argArray.length)) arguments argArray[0], argArray[1],...,argArray[ToUint32(argArray.length)-1]
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A7_T3.js
 * @description argArray is (empty object, new Array("nine","inch","nails"))
 */

i=0;

p={toString:function(){return "a"+(++i);}};

obj={};

Function(p,"a2,a3","this.shifted=a1;").apply(obj, new Array("nine","inch","nails"));

//CHECK#1
if (obj["shifted"] !== "nine") {
  $ERROR('#1: If argArray is either an array or an arguments object, the function is passed the...');
}

//CHECK#2
if (typeof this["shifted"] !== "undefined") {
  $ERROR('#2: If argArray is either an array or an arguments object, the function is passed the...');
}


