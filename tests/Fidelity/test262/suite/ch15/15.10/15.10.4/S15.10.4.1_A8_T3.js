// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * let P be ToString(pattern) and let F be ToString(flags)
 *
 * @path ch15/15.10/15.10.4/S15.10.4.1_A8_T3.js
 * @description Pattern is {toString:function(){return "[0-9]";}} and flags is (function(){return "m";})()
 */

__re = new RegExp({toString:function(){return "[0-9]";}}, (function(){return "m";})());

//CHECK#1
if (__re.ignoreCase !== false) {
	$ERROR('#1: __re = new RegExp({toString:function(){return "[0-9]"; __re.ignoreCase === false. Actual: ' + (__re.ignoreCase));
}

//CHECK#2
if (__re.multiline !== true) {
	$ERROR('#2: __re = new RegExp({toString:function(){return "[0-9]"; __re.multiline === true. Actual: ' + (__re.multiline));
}

//CHECK#3
if (__re.global !== false) {
	$ERROR('#3: __re = new RegExp({toString:function(){return "[0-9]"; __re.global === false. Actual: ' + (__re.global));
}

//CHECK#4
if (__re.lastIndex !== 0) {
	$ERROR('#4: __re = new RegExp({toString:function(){return "[0-9]"; __re.lastIndex === 0. Actual: ' + (__re.lastIndex));
}

//CHECK#5
if (typeof __re.source === "undefined") {
	$ERROR('#5: __re = new RegExp({toString:function(){return "[0-9]"; typeof __re.source !== "undefined"');
}


