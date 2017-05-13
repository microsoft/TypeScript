// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * A TypeError exception is thrown if the this value is not an object for which the value of the internal [[Class]] property is "RegExp"
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A2_T3.js
 * @description The tested object is function object
 */

__instance.exec = RegExp.prototype.exec;

//CHECK#1
try {
  with(__instance) exec("message to investigate");
	$ERROR('#1.1: __instance.exec = RegExp.prototype.exec; with(__instance) exec("message to investigate"); function __instance(){}');
} catch (e) {
	if ((e instanceof TypeError) !== true) {
		$ERROR('#1.2: __instance.exec = RegExp.prototype.exec; with(__instance) exec("message to investigate"); function __instance(){}. Actual: ' + (e));
	}
}

function __instance(){};

