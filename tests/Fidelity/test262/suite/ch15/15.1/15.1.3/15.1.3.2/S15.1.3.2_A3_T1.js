// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let reservedURIComponentSet be the empty string
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A3_T1.js
 * @description uriReserved and "#" not in reservedURIComponentSet. HexDigit in [0..9, A..F]
 */

//CHECK#1
if (decodeURIComponent("%3B") !== ";") {
  $ERROR('#1: decodeURIComponent("%3B") equal ";", not "%3B"');
}

//CHECK#2
if (decodeURIComponent("%2F") !== "/") {
  $ERROR('#2: decodeURIComponent("%2F") equal "/", not "%2F"');
}

//CHECK#3
if (decodeURIComponent("%3F") !== "?") {
  $ERROR('#3: decodeURIComponent("%3F") equal "?", not "%3F"');
}

//CHECK#4
if (decodeURIComponent("%3A") !== ":") {
  $ERROR('#4: decodeURIComponent("%3A") equal ":", not "%3A"');
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
if (decodeURIComponent("%3D") !== "=") {
  $ERROR('#7.1: decodeURIComponent("%3D") equal "=", not "%3D"');
}

//CHECK#8
if (decodeURIComponent("%2B") !== "+") {
  $ERROR('#8.1: decodeURIComponent("%2B") equal "+", not "%2B"');
}

//CHECK#9
if (decodeURIComponent("%24") !== "$") {
  $ERROR('#9: decodeURIComponent("%24") equal "$", not "%24"');
}

//CHECK#10
if (decodeURIComponent("%2C") !== ",") {
  $ERROR('#10: decodeURIComponent("%2C") equal ",", not "%2C"');
}

//CHECK#11
if (decodeURIComponent("%23") !== "#") {
  $ERROR('#11: decodeURIComponent("%23") equal "#", not "%23"');
}

