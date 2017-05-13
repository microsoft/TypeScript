// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check Function Expression for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A5.5_T4.js
 * @description Insert some LineTerminators into function body
 */

//CHECK#1
var x =
1 + (function (t){return {a:t
}
})
(2 + 3).
a

if (x !== 6) {
  $ERROR('#1: Check Function Expression for automatic semicolon insertion');
} 

