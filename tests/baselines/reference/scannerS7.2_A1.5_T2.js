//// [tests/cases/conformance/scanner/ecmascript5/scannerS7.2_A1.5_T2.ts] ////

//// [scannerS7.2_A1.5_T2.ts]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * NO-BREAK SPACE (U+00A0) between any two tokens is allowed
 *
 * @path ch07/7.2/S7.2_A1.5_T2.js
 * @description Insert real NO-BREAK SPACE between tokens of var x=1
 */

//CHECK#1
eval("\u00A0var x\u00A0= 1\u00A0");
if (x !== 1) {
  $ERROR('#1: eval("\\u00A0var x\\u00A0= 1\\u00A0"); x === 1. Actual: ' + (x));
}

//CHECK#2
 var x = 1 ;
if (x !== 1) {
  $ERROR('#2:  var x = 1 ; x === 1. Actual: ' + (x));
}




//// [scannerS7.2_A1.5_T2.js]
// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/**
 * NO-BREAK SPACE (U+00A0) between any two tokens is allowed
 *
 * @path ch07/7.2/S7.2_A1.5_T2.js
 * @description Insert real NO-BREAK SPACE between tokens of var x=1
 */
//CHECK#1
eval("\u00A0var x\u00A0= 1\u00A0");
if (x !== 1) {
    $ERROR('#1: eval("\\u00A0var x\\u00A0= 1\\u00A0"); x === 1. Actual: ' + (x));
}
//CHECK#2
var x = 1;
if (x !== 1) {
    $ERROR('#2:  var x = 1 ; x === 1. Actual: ' + (x));
}
