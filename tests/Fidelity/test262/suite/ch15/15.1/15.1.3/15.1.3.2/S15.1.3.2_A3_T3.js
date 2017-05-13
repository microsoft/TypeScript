// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Let reservedURIComponentSet be the empty string
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A3_T3.js
 * @description Complex test
 */

//CHECK#1
if (decodeURIComponent("%3B%2F%3F%3A%40%26%3D%2B%24%2C%23") !== ";/?:@&=+$,#") {
  $ERROR('#1: decodeURIComponent("%3B%2F%3F%3A%40%26%3D%2B%24%2C%23") equal ";/?:@&=+$,#", not "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23"');
}

//CHECK#2
if (decodeURIComponent("%3b%2f%3f%3a%40%26%3d%2b%24%2c%23") !== ";/?:@&=+$,#") {
  $ERROR('#2: decodeURIComponent("%3b%2f%3f%3a%40%26%3d%2b%24%2c%23") equal ";/?:@&=+$,#" or "%3B%2F%3F%3A%40%26%3D%2B%24%2C%23", not "%3b%2f%3f%3a%40%26%3d%2b%24%2c%23"');
}

