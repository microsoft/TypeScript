// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.indexOf works properly
 *
 * @path ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A5_T4.js
 * @description Search substring from begin of string
 */

var TEST_STRING = new String( " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~" );

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
for (var k = 0, i = 0x0020; i < 0x007d; i++, k++ ) {
    if (TEST_STRING.indexOf( (String.fromCharCode(i)+ String.fromCharCode(i+1) + String.fromCharCode(i+2)), 0 )!==k) {
      $ERROR('#'+(i-0x0020)+': TEST_STRING.indexOf( (String.fromCharCode('+i+')+ String.fromCharCode('+(i+1)+') + String.fromCharCode('+(i+2)+')), 0 )==='+k+'. Actual: '+TEST_STRING.indexOf( (String.fromCharCode(i)+ String.fromCharCode(i+1) + String.fromCharCode(i+2)), 0 )); 
    }
}
//
//////////////////////////////////////////////////////////////////////////////

