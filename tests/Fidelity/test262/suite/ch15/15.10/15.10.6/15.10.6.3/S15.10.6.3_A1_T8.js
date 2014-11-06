// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Equivalent to the expression RegExp.prototype.exec(string) != null
 *
 * @path ch15/15.10/15.10.6/15.10.6.3/S15.10.6.3_A1_T8.js
 * @description RegExp is /[a-z]/ and tested string is {toString:void 0, valueOf:function(){throw "invalof";}}
 */

//CHECK#1
try {
  $ERROR('#1.1: /[a-z]/.test({toString:void 0, valueOf:function(){throw "invalof";}}) throw "invalof". Actual: ' + (/[a-z]/.test({toString:void 0, valueOf:function(){throw "invalof";}})));
} catch (e) {
  if (e !== "invalof") {
    $ERROR('#1.2: /[a-z]/.test({toString:void 0, valueOf:function(){throw "invalof";}}) throw "invalof". Actual: ' + (e));
  }
}

