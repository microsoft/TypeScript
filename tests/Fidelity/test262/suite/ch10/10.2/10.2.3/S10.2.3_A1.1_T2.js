// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Global object has properties such as built-in objects such as
 * Math, String, Date, parseInt, etc
 *
 * @path ch10/10.2/10.2.3/S10.2.3_A1.1_T2.js
 * @description Global execution context - Function Properties
 */

//CHECK#4
if ( eval === null ) {
  $ERROR("#4: eval === null");
}

//CHECK#5
if ( parseInt === null ) {
  $ERROR("#5: parseInt === null");
}

//CHECK#6
if ( parseFloat === null ) {
  $ERROR("#6: parseFloat === null");
}

//CHECK#7
if ( isNaN === null ) {
  $ERROR("#7: isNaN === null");
}

//CHECK#8
if ( isFinite === null ) {
  $ERROR("#8: isFinite === null");
}

//CHECK#9
if ( decodeURI === null ) {
  $ERROR("#9: decodeURI === null");
}

//CHECK#10
if ( decodeURIComponent === null ) {
  $ERROR("#10: decodeURIComponent === null");
}

//CHECK#11
if ( encodeURI === null ) {
  $ERROR("#11: encodeURI === null");
}

//CHECK#12
if ( encodeURIComponent === null ) {
  $ERROR("#12: encodeURIComponent === null");
}

