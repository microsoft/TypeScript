// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * unescapedURISet containing one instance of each character valid in uriUnescaped
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A3.2_T2.js
 * @description Complex tests, uriUnescaped :: DecimalDigit
 */

DecimalDigit = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
for (indexC = 0; indexC < DecimalDigit.length; indexC++) {
  var str = DecimalDigit[indexC];    
  if (encodeURI(str) !== str) {
    $ERROR('#' + (indexC + 1) + ': unescapedURISet containing' + str);
  }  
}

