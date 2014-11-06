// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then return R unchanged
 *
 * @path ch15/15.10/15.10.3/S15.10.3.1_A1_T5.js
 * @description R is /\b/m and instance is RegExp(R, undefined)
 */

__re = /\b/m;
__instance = RegExp(__re, undefined);
__re.indicator = 1;

//CHECK#1
if (__instance.indicator !== 1) {
	$ERROR('#1: __re = /\\b/m; __instance = RegExp(__re, undefined); __re.indicator = 1; __instance.indicator === 1. Actual: ' + (__instance.indicator));
}


