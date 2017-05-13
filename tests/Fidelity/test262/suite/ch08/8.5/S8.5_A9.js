// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Globally defined variable NaN has not been altered by program execution
 *
 * @path ch08/8.5/S8.5_A9.js
 * @description Try alter globally defined variable NaN
 * @noStrict
 */

Number.NaN = 1;

if (Number.NaN === 1) {
  $ERROR('#1: Globally defined variable NaN has not been altered by program execution');
}

