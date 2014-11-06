// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * unescapedURIComponentSet containing one instance of each character valid in uriUnescaped
 *
 * @path ch15/15.1/15.1.3/15.1.3.4/S15.1.3.4_A3.2_T1.js
 * @description Complex tests, uriUnescaped :: uriAlpha
 */

uriAlpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
for (indexC = 0; indexC < uriAlpha.length; indexC++) {
  var str = uriAlpha[indexC];    
  if (encodeURIComponent(str) !== str) {
    $ERROR('#' + (indexC + 1) + ': unescapedURISet containing ' + str);
  }  
}

