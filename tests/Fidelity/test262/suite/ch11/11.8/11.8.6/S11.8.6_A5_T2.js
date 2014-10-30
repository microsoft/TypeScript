// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * TypeError is subclass of Error from instanceof operator point of view
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A5_T2.js
 * @description Checking TypeError case
 */

var __t__err = new TypeError;

//CHECK#1
if (!(__t__err instanceof Error)) {
	$ERROR('#1: TypeError is subclass of Error from instanceof operator poit of view');
}

//CHECK#2
if (!(__t__err instanceof TypeError)) {
	$ERROR('#2: TypeError is subclass of Error from instanceof operator poit of view');
}

//////////////////////////////////////////////////////////////////////////////
var err__t__ = TypeError('failed');

//CHECK#3
if (!(err__t__ instanceof Error)) {
	$ERROR('#3: TypeError is subclass of Error from instanceof operator poit of view');
}

//CHECK#4
if (!(err__t__ instanceof TypeError)) {
	$ERROR('#4: TypeError is subclass of Error from instanceof operator poit of view');
}


