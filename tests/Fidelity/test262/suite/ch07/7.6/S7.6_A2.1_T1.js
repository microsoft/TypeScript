// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierPart :: IdentifierStart
 *
 * @path ch07/7.6/S7.6_A2.1_T1.js
 * @description IdentifierStart :: UnicodeLetter
 */

//CHECK#1
try {
  var identifier = "x" + "x";     
  eval("var " + identifier + "=1");
  if (xx !== 1) {
    $ERROR('#1.1: var identifier = "x" + "x"; eval("var " + identifier + "=1"); xx === 1. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#1.2: var identifier = "x" + "x"; eval("var " + identifier + "=1"); xx === 1. Actual: ' + (xx));
}

//CHECK#2
try {
  var identifier = "x" + String.fromCharCode(0x0078);     
  eval("var " + identifier + "=2");
  if (xx !== 2) {
    $ERROR('#2.1: var identifier = "x" + String.fromCharCode(0x0078); eval("var " + identifier + "=2"); xx === 2. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#2.2: var identifier = "x" + String.fromCharCode(0x0078); eval("var " + identifier + "=2"); xx === 2. Actual: ' + (xx));
}

//CHECK#3
try {
  var identifier = String.fromCharCode(0x0078) + String.fromCharCode(0x0078);     
  eval("var " + identifier + "=3");
  if (xx !== 3) {
    $ERROR('#3.1: var identifier = String.fromCharCode(0x0078) + String.fromCharCode(0x0078); eval("var " + identifier + "=3"); xx === 3. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#3.2: var identifier = String.fromCharCode(0x0078) + String.fromCharCode(0x0078); eval("var " + identifier + "=3"); xx === 3. Actual: ' + (xx));
}

//CHECK#4
try {
  var identifier = "$" + String.fromCharCode(0x0078);     
  eval("var " + identifier + "=4");
  if ($x !== 4) {
    $ERROR('#4.1: var identifier = "$" + String.fromCharCode(0x0078); eval("var " + identifier + "=4"); $x === 4. Actual: ' + ($x));
  }
} catch (e) {
  $ERROR('#4.2: var identifier = "$" + String.fromCharCode(0x0078); eval("var " + identifier + "=4"); $x === 4. Actual: ' + ($x));
}

//CHECK#5
try {
  var identifier = "_" + String.fromCharCode(0x0078);     
  eval("var " + identifier + "=5");
  if (_x !== 5) {
    $ERROR('#5.1: var identifier = "_" + String.fromCharCode(0x0078); eval("var " + identifier + "=5"); _x === 5. Actual: ' + (_x));
  }
} catch (e) {
  $ERROR('#5.2: var identifier = "_" + String.fromCharCode(0x0078); eval("var " + identifier + "=5"); _x === 5. Actual: ' + (_x));
}

//CHECK#6
try {
  var \u0078x = 6;
  if (xx !== 6) {
    $ERROR('#6.1: var \\u0078x = 1; xx === 6. Actual: ' + (xx));
  }
} catch (e) {
  $ERROR('#6.2: var \\u0078x = 1; xx === 6. Actual: ' + (xx));
}

