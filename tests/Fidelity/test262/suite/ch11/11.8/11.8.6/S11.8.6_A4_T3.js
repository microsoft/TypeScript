// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Only constructor call (with "new" keyword) makes instance
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A4_T3.js
 * @description Checking String case
 */

//CHECK#1
if ("" instanceof String) {
	$ERROR('#1: "" is not instanceof String');
}

//CHECK#2
if (String("") instanceof String) {
	$ERROR('#2: String("") is not instanceof String');
}

//CHECK#3
if (new String instanceof String !== true) {
	$ERROR('#3: new String instanceof String');
}

