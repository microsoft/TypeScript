// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.exec(string) Performs a regular expression match of ToString(string) against the regular expression and
 * returns an Array object containing the results of the match, or null if the string did not match
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A1_T8.js
 * @description String is {toString:void 0, valueOf:function(){throw "invalof";}} and RegExp is /[a-z]/
 */

//CHECK#1
try {
  $ERROR('#1.1: /[a-z]/.exec({toString:void 0, valueOf:function(){throw "invalof"}}) throw "invalof". Actual: ' + (/[a-z]/.exec({toString:void 0, valueOf:function(){throw "invalof"}})));
} catch (e) {
  if (e !== "invalof") {
    $ERROR('#1.2: /[a-z]/.exec({toString:void 0, valueOf:function(){throw "invalof"}}) throw "invalof". Actual: ' + (e));
  }
}


