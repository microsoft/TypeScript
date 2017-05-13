// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * parseInt is no longer allowed to treat a leading zero as indicating
 * octal.  "If radix is undefined or 0, it is assumed to be 10 except
 * when the number begins with the character pairs 0x or 0X, in which
 * case a radix of 16 is assumed."
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A5.1_T1.js
 * @description Check if parseInt still accepts octal
 */

if (parseInt('010') !== 10) {
  $ERROR("parseInt should no longer accept octal");
}
