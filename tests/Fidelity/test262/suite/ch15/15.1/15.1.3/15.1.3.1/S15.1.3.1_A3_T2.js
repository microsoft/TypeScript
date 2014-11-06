// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let reservedURISet be a string containing one instance of each character valid
 * in uriReserved plus "#"
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A3_T2.js
 * @description Checking all character in reservedURISet. HexDigit in [0..9, a..f]
 */

//CHECK#1
if (decodeURI("%3b") !== "%3b") {
  $ERROR('#1: decodeURI("%3b") equal "%3b", not ";" or "%3B"');
}

//CHECK#2
if (decodeURI("%2f") !== "%2f") {
  $ERROR('#2: decodeURI("%2f") equal "%2f", not "/" or "%2F"');
}

//CHECK#3
if (decodeURI("%3f") !== "%3f") {
  $ERROR('#3: decodeURI("%3f") equal "%3f", not "?" or "%3F"');
}

//CHECK#4
if (decodeURI("%3a") !== "%3a") {
  $ERROR('#4: decodeURI("%3a") equal "%3a", not ":" or "%3A"');
}

//CHECK#5
if (decodeURI("%40") !== "%40") {
  $ERROR('#5: decodeURI("%40") equal "%40", not "@"');
}

//CHECK#6
if (decodeURI("%26") !== "%26") {
  $ERROR('#6: decodeURI("%26") equal "%26", not "&"');
}

//CHECK#7
if (decodeURI("%3d") !== "%3d") {
  $ERROR('#7.1: decodeURI("%3d") equal "%3d", not "=" or "%3D"');
}

//CHECK#8
if (decodeURI("%2b") !== "%2b") {
  $ERROR('#8.1: decodeURI("%2b") equal "%2b", not "+" or "%2B"');
}

//CHECK#9
if (decodeURI("%24") !== "%24") {
  $ERROR('#9: decodeURI("%24") equal "%24", not "$"');
}

//CHECK#10
if (decodeURI("%2c") !== "%2c") {
  $ERROR('#10: decodeURI("%2c") equal "%2c", not "," or "%2C"');
}

//CHECK#11
if (decodeURI("%23") !== "%23") {
  $ERROR('#11: decodeURI("%23") equal "%23", not "#"');
}

