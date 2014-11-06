// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Only constructor call (with "new" keyword) makes instance
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A4_T1.js
 * @description Checking Boolean case
 */

//CHECK#1
if (false instanceof Boolean) {
	$ERROR('#1: false is not instanceof Boolean');
}

//CHECK#2
if (Boolean(false) instanceof Boolean) {
	$ERROR('#2: Boolean(false) is not instanceof Boolean');
}

//CHECK#3
if (new Boolean instanceof Boolean !== true) {
	$ERROR('#3: new Boolean instanceof Boolean');
}


