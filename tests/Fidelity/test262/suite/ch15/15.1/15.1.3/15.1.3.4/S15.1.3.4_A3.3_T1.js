// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * unescapedURIComponentSet not containing "#"
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A3.3_T1.js
 * @description encodeURIComponent("#") === "%23"
 */

if (encodeURIComponent("#") !== "%23") {
  $ERROR('#1: unescapedURIComponentSet not containing "%23"');
}  

