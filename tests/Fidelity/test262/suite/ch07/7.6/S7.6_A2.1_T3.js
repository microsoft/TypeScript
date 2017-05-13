// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierPart :: IdentifierStart
 *
 * @path ch07/7.6/S7.6_A2.1_T3.js
 * @description IdentifierStart :: _
 */

//CHECK#1
try {
  var identifier = "x" + "_";     
  eval("var " + identifier + "=1");
  if (x_ !== 1) {
    $ERROR('#1.1: var identifier = "x" + "_"; eval("var " + identifier + "=1"); x_ === 1. Actual: ' + (x_));
  }
} catch (e) {
  $ERROR('#1.2: var identifier = "x" + "_"; eval("var " + identifier + "=1"); x_ === 1. Actual: ' + (x_));
}

//CHECK#2
try {
  var identifier = String.fromCharCode(0x0078) + "_";     
  eval("var " + identifier + "=2");
  if (x_ !== 2) {
    $ERROR('#2.1: var identifier = String.fromCharCode(0x0078) + "_"; eval("var " + identifier + "=2"); x_ === 2. Actual: ' + (x_));
  }
} catch (e) {
  $ERROR('#2.2: var identifier = String.fromCharCode(0x0078) + "_"; eval("var " + identifier + "=2"); x_ === 2. Actual: ' + (x_));
}

//CHECK#3
try {
  var identifier = "_" + "_";     
  eval("var " + identifier + "=3");
  if (__ !== 3) {
    $ERROR('#3.1: var identifier = "_" + "_"; eval("var " + identifier + "=3"); __ === 3. Actual: ' + (__));
  }
} catch (e) {
  $ERROR('#3.2: var identifier = "_" + "_"; eval("var " + identifier + "=3"); __ === 3. Actual: ' + (__));
}

//CHECK#4
try {
  var identifier = String.fromCharCode(0x005F) + String.fromCharCode(0x005F);     
  eval("var " + identifier + "=4");
  if (__ !== 4) {
    $ERROR('#4.1: var identifier = String.fromCharCode(0x005F) + String.fromCharCode(0x005F); eval("var " + identifier + "=4"); __ === 4. Actual: ' + (__));
  }
} catch (e) {
  $ERROR('#4.2: var identifier = String.fromCharCode(0x005F) + String.fromCharCode(0x005F); eval("var " + identifier + "=4"); __ === 4. Actual: ' + (__));
}

//CHECK#5
try {
  var identifier = "_" + "_";     
  eval("var " + identifier + "=5");
  if (__ !== 5) {
    $ERROR('#5.1: var identifier = "_" + "_"; eval("var " + identifier + "=5"); __ === 5. Actual: ' + (__));
  }
} catch (e) {
  $ERROR('#5.2: var identifier = "_" + "_"; eval("var " + identifier + "=5"); __ === 5. Actual: ' + (__));
}

//CHECK#6
try {
  var \u0078_ = 6;
  if (x_ !== 6) {
    $ERROR('#6.1: var \\u0078_ = 1; x_ === 6. Actual: ' + (x_));
  }
} catch (e) {
  $ERROR('#6.2: var \\u0078_ = 1; x_ === 6. Actual: ' + (x_));
}

