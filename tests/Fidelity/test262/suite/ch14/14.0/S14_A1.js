// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionExpression must be localed in a reacheable fragment of the program
 *
 * @path ch14/14.0/S14_A1.js
 * @description Declaring a function within an "if" Expression
 */

var THERE = "I'm there";
var HERE = "I'm here";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ( __func !== undefined) {
	$ERROR('#1: __func === undefined. Actual:  __func ==='+ __func  );
}
//
//////////////////////////////////////////////////////////////////////////////

if (true){
    var __func = function(){return HERE;};
} else {
    var __func = function (){return THERE;};
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func() !== HERE) {
	$ERROR('#2: __func() === HERE. Actual:  __func() ==='+ __func()  );
}
//
//////////////////////////////////////////////////////////////////////////////

