// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If pattern is an object R whose [[Class]] property is "RegExp" and flags is undefined, then let P be
 * the pattern used to construct R and let F be the flags used to construct R
 *
 * @path ch15/15.10/15.10.4/S15.10.4.1_A1_T5.js
 * @description Pattern is RegExp("1?","mig") and RegExp is new RegExp(pattern,(function(){})())
 */

__pattern = RegExp("1?","mig");
__re = new RegExp(__pattern, (function(){})());

//CHECK#1
if (__re.source !== __pattern.source) {
  $ERROR('#1: __pattern = RegExp("1?","mig"); __re = new RegExp(__pattern, (function(){})()); __re.source === __pattern.source. Actual: '+ (__re.source));
}

//CHECK#2
if (__re.multiline !== __pattern.multiline) {
  $ERROR('#2: __pattern = RegExp("1?","mig"); __re = new RegExp(__pattern, (function(){})()); __re.multiline === __pattern.multiline. Actual: ' + (__re.multiline));
}

//CHECK#3
if (__re.global !== __pattern.global) {
  $ERROR('#3: __pattern = RegExp("1?","mig"); __re = new RegExp(__pattern, (function(){})()); __re.global === __pattern.global. Actual: ' + (__re.global));
}

//CHECK#4
if (__re.ignoreCase !== __pattern.ignoreCase) {
  $ERROR('#4: __pattern = RegExp("1?","mig"); __re = new RegExp(__pattern, (function(){})()); __re.ignoreCase === __pattern.ignoreCase. Actual: ' + (__re.ignoreCase));
}



