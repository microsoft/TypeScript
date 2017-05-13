// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "break" within a "do-while" Statement is allowed and performed as described in 12.8
 *
 * @path ch12/12.6/12.6.1/S12.6.1_A4_T5.js
 * @description Using labeled "break" in order to continue a loop
 */

//CHECK#1
var i=0;
woohoo:{
  do{
    i++;
    if ( ! (i < 10) ) {
      break woohoo;
      $ERROR('#1.1: "break woohoo" must break loop');
    }
  } while ( true );
  if (i!==10) $ERROR('#1.2: i===10. Actual:  i==='+ i );
}

