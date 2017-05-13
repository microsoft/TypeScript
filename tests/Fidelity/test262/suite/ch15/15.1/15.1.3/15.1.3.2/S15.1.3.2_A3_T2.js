// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let reservedURIComponentSet be the empty string
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A3_T2.js
 * @description uriReserved and "#" not in reservedURIComponentSet. HexDigit in [0..9, a..f]
 */

//CHECK#1
if (decodeURIComponent("%3b") !== ";") {
  $ERROR('#1: decodeURIComponent("%3b") equal ";", not "%3B" or "%3b"');
}

//CHECK#2
if (decodeURIComponent("%2f") !== "/") {
  $ERROR('#2: decodeURIComponent("%2f") equal "/", not "%2F" or "%2f"');
}

//CHECK#3
if (decodeURIComponent("%3f") !== "?") {
  $ERROR('#3: decodeURIComponent("%3f") equal "?", not "%3F" or "%3f"');
}

//CHECK#4
if (decodeURIComponent("%3a") !== ":") {
  $ERROR('#4: decodeURIComponent("%3a") equal ":", not "%3A" or "%3a"');
}

//CHECK#5
if (decodeURIComponent("%40") !== "@") {
  $ERROR('#5: decodeURIComponent("%40") equal "@", not "%40"');
}

//CHECK#6
if (decodeURIComponent("%26") !== "&") {
  $ERROR('#6: decodeURIComponent("%26") equal "&", not "%26"');
}

//CHECK#7
if (decodeURIComponent("%3d") !== "=") {
  $ERROR('#7.1: decodeURIComponent("%3d") equal "=", not "%3D" or "%3d"');
}

//CHECK#8
if (decodeURIComponent("%2b") !== "+") {
  $ERROR('#8.1: decodeURIComponent("%2b") equal "+", not "%2B" or "%2b"');
}

//CHECK#9
if (decodeURIComponent("%24") !== "$") {
  $ERROR('#9: decodeURIComponent("%24") equal "$", not "%24"');
}

//CHECK#10
if (decodeURIComponent("%2c") !== ",") {
  $ERROR('#10: decodeURIComponent("%2c") equal ",", not "%2C" or "%2c"');
}

//CHECK#11
if (decodeURIComponent("%23") !== "#") {
  $ERROR('#11: decodeURIComponent("%23") equal "#", not "%23"');
}

