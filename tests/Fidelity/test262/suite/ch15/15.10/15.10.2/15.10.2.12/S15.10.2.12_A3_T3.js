// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: w evaluates by returning the set of characters containing the sixty-three characters:
 * a - z, A - Z, 0 - 9, _
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A3_T3.js
 * @description 0 - 9, _
 */

var regexp_w = /\w/;

//CHECK#0030-0039
var result = true; 
for (alpha = 0x0030; alpha <= 0x0039; alpha++) {
  str = String.fromCharCode(alpha);
  arr = regexp_w.exec(str); 
  if ((arr === null) || (arr[0] !== str)) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: 0 - 9');
}

//CHECK#005F
var arr = regexp_w.exec("_"); 
if ((arr === null) || (arr[0] !== "\u005F")) {
  $ERROR('#2: _');
}

//CHECK#0020
if (regexp_w.exec(" ") !== null) {
  $ERROR('#3:  ');
}

