// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T7.js
 * @description Argument is undefined, and instance is new String
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(undefined) evaluates to "undefined" search(undefined) evaluates to search("undefined")
if (String("undefined").search(undefined) !== 0) {
  $ERROR('#1: String("undefined").search(undefined) === 0. Actual: '+String("undefined").search(undefined) );
}
//
//////////////////////////////////////////////////////////////////////////////

