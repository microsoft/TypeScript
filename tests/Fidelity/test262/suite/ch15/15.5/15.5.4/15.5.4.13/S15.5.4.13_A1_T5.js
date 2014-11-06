// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A1_T5.js
 * @description Arguments are null and call other slice(start, end), and instance is function object, that have overrided valueOf and toString functions
 */

__func.valueOf=function(){return "gnulluna"};
__func.toString=function(){return __func;};

Function.prototype.slice=String.prototype.slice;


//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func.slice(null, Function().slice(__func,5).length) !== "gnull") {
  $ERROR('#1: __func.slice(null, Function().slice(__func,5).length) === "gnull". Actual: '+__func.slice(null, Function().slice(__func,5).length) );
}
//
//////////////////////////////////////////////////////////////////////////////

function __func(){};

