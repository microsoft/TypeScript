// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T4.js
 * @description Call search (regexp) without arguments
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString() evaluates to "" search() evaluates to search("")
if ("".search() !== 0) {
  $ERROR('#1: "".search() === 0. Actual: '+("".search()) );
}

if ("--undefined--".search() != 0) {
  $ERROR('#1: "--undefined--".search() === 0. Actual: '+("--undefined--".search()) );
}
//
//////////////////////////////////////////////////////////////////////////////

