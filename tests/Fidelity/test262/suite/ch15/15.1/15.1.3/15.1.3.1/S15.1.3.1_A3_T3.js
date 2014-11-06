// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let reservedURISet be a string containing one instance of each character valid
 * in uriReserved plus "#"
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A3_T3.js
 * @description Complex test
 */

//CHECK#1
if (decodeURI("%3B%2F%3F%3A%40%26%3D%2B%24%2C%23") !== "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23") {
  $ERROR('#1: decodeURI("%3B%2F%3F%3A%40%26%3D%2B%24%2C%23") equal "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23", not ";/?:@&=+$,#"');
}

//CHECK#2
if (decodeURI("%3b%2f%3f%3a%40%26%3d%2b%24%2c%23") !== "%3b%2f%3f%3a%40%26%3d%2b%24%2c%23") {
  $ERROR('#2: decodeURI("%3b%2f%3f%3a%40%26%3d%2b%24%2c%23") equal "%3b%2f%3f%3a%40%26%3d%2b%24%2c%23", not ";/?:@&=+$,#" or "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23"');
}

