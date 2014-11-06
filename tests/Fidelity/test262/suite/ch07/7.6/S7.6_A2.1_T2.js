// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * IdentifierPart :: IdentifierStart
 *
 * @path ch07/7.6/S7.6_A2.1_T2.js
 * @description IdentifierStart :: $
 */

//CHECK#1
try {
  var identifier = "x" + "$";     
  eval("var " + identifier + "=1");
  if (x$ !== 1) {
    $ERROR('#1.1: var identifier = "x" + "$"; eval("var " + identifier + "=1"); x$ === 1. Actual: ' + (x$));
  }
} catch (e) {
  $ERROR('#1.2: var identifier = "x" + "$"; eval("var " + identifier + "=1"); x$ === 1. Actual: ' + (x$));
}

//CHECK#2
try {
  var identifier = String.fromCharCode(0x0078) + "$";     
  eval("var " + identifier + "=2");
  if (x$ !== 2) {
    $ERROR('#2.1: var identifier = String.fromCharCode(0x0078) + "$"; eval("var " + identifier + "=2"); x$ === 2. Actual: ' + (x$));
  }
} catch (e) {
  $ERROR('#2.2: var identifier = String.fromCharCode(0x0078) + "$"; eval("var " + identifier + "=2"); x$ === 2. Actual: ' + (x$));
}

//CHECK#3
try {
  var identifier = "$" + "$";     
  eval("var " + identifier + "=3");
  if ($$ !== 3) {
    $ERROR('#3.1: var identifier = "$" + "$"; eval("var " + identifier + "=3"); $$ === 3. Actual: ' + ($$));
  }
} catch (e) {
  $ERROR('#3.2: var identifier = "$" + "$"; eval("var " + identifier + "=3"); $$ === 3. Actual: ' + ($$));
}

//CHECK#4
try {
  var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024);     
  eval("var " + identifier + "=4");
  if ($$ !== 4) {
    $ERROR('#4.1: var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024); eval("var " + identifier + "=4"); $$ === 4. Actual: ' + ($$));
  }
} catch (e) {
  $ERROR('#4.2: var identifier = String.fromCharCode(0x0024) + String.fromCharCode(0x0024); eval("var " + identifier + "=4"); $$ === 4. Actual: ' + ($$));
}

//CHECK#5
try {
  var identifier = "_" + "$";     
  eval("var " + identifier + "=5");
  if (_$ !== 5) {
    $ERROR('#5.1: var identifier = "_" + "$"; eval("var " + identifier + "=5"); _$ === 5. Actual: ' + (_$));
  }
} catch (e) {
  $ERROR('#5.2: var identifier = "_" + "$"; eval("var " + identifier + "=5"); _$ === 5. Actual: ' + (_$));
}

//CHECK#6
try {
  var \u0078$ = 6;
  if (x$ !== 6) {
    $ERROR('#6.1: var \\u0078$ = 1; x$ === 6. Actual: ' + (x$));
  }
} catch (e) {
  $ERROR('#6.2: var \\u0078$ = 1; x$ === 6. Actual: ' + (x$));
}

