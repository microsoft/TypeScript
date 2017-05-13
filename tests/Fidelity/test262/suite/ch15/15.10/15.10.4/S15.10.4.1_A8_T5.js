// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * let P be ToString(pattern) and let F be ToString(flags)
 *
 * @path ch15/15.10/15.10.4/S15.10.4.1_A8_T5.js
 * @description Pattern is new Object("abc{1}") and flags is {toString:function(){return "";}}
 */

__re = new RegExp(new Object("abc{1}"), {toString:function(){return "";}});

//CHECK#1
if (__re.ignoreCase !== false) {
	$ERROR('#1: __re = new RegExp(new Object("abc{1}"), {toString:function(){return ""; __re.ignoreCase === false. Actual: ' + (__re.ignoreCase));
}

//CHECK#2
if (__re.multiline !== false) {
	$ERROR('#2: __re = new RegExp(new Object("abc{1}"), {toString:function(){return ""; __re.multiline === false. Actual: ' + (__re.multiline));
}

//CHECK#3
if (__re.global !== false) {
	$ERROR('#3: __re = new RegExp(new Object("abc{1}"), {toString:function(){return ""; __re.global === false. Actual: ' + (__re.global));
}

//CHECK#4
if (__re.lastIndex !== 0) {
	$ERROR('#4: __re = new RegExp(new Object("abc{1}"), {toString:function(){return ""; __re.lastIndex === 0. Actual: ' + (__re.lastIndex));
}

//CHECK#5
if (typeof __re.source === "undefined") {
	$ERROR('#5: __re = new RegExp(new Object("abc{1}"), {toString:function(){return ""; typeof __re.source !== "undefined"');
}


