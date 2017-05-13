// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp) returns ...
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A2_T7.js
 * @description Simple search sentence inside string
 */

var aString = new String("test string probe");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (aString.search("string pro")!== 5) {
  $ERROR('#1: var aString = new String("test string probe"); aString.search("string pro")=== 5. Actual: '+aString.search("string pro"));
}
//
//////////////////////////////////////////////////////////////////////////////

