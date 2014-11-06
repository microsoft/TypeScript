// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * unescapedURISet containing "#"
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A3.3_T1.js
 * @description encodeURI("#") === "#"
 */

if (encodeURI("#") !== "#") {
  $ERROR('#1: unescapedURISet containing "#"');
}  

