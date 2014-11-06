// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of RegExp.prototype.constructor is the built-in RegExp constructor
 *
 * @path ch15/15.10/15.10.6/S15.10.6.1_A1_T2.js
 * @description Compare instance.constructor !== RegExp, where instance is new RegExp.prototype.constructor
 */

__FACTORY = RegExp.prototype.constructor;

__instance = new __FACTORY;

//CHECK#1
if ((__instance instanceof RegExp) !== true) {
	$ERROR('#1: __FACTORY = RegExp.prototype.constructor; __instance = new __FACTORY; (__instance instanceof RegExp) === true');
}

//CHECK#2
if (__instance.constructor !== RegExp) {
	$ERROR('#2: __FACTORY = RegExp.prototype.constructor; __instance = new __FACTORY; __instance.constructor === RegExp. Actual: ' + (__instance.constructor));
}


