// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * unescapedURIComponentSet containing one instance of each character valid in uriUnescaped
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A3.2_T3.js
 * @description Complex tests, uriUnescaped :: uriMark
 */

uriMark = ["-", "_", ".", "!", "~", "*", "'", "(", ")"];
for (indexC = 0; indexC < uriMark.length; indexC++) {
  var str = uriMark[indexC];    
  if (encodeURIComponent(str) !== str) {
    $ERROR('#' + (indexC + 1) + ': unescapedURISet containing' + str);
  }  
}

