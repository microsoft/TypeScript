// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If pos is a value of Number type that is an integer, then the result of x.charAt(pos) is equal to the result of x.substring(pos, pos+1)
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A4_T1.js
 * @description Compare results of x.charAt(pos) and x.substring(pos, pos+1)
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
for(var i=0; i<6; i++) {
  if ("ABC\u0041\u0042\u0043".charAt(i) !== "\u0041\u0042\u0043ABC".substring(i, i+1)) {
      $ERROR('#'+i+': "ABC\\u0041\\u0042\\u0043".charAt('+i+') === "\\u0041\\u0042\\u0043ABC".substring('+i+', '+(i+1)+'). Actual: "ABC\\u0041\\u0042\\u0043".charAt('+i+') ==='+("ABC\u0041\u0042\u0043".charAt(i)) ); 
    }
}
    
//
//////////////////////////////////////////////////////////////////////////////

