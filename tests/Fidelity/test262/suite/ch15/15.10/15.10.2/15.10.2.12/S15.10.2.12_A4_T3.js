// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: W evaluates by returning the set of all characters not
 * included in the set returned by CharacterClassEscape :: w
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A4_T3.js
 * @description 0 - 9
 */

var regexp_W = /\W/;

//CHECK#0030-0039
var result = true; 
for (alpha = 0x0030; alpha <= 0x0039; alpha++) {
  if (regexp_W.exec(String.fromCharCode(alpha)) !== null) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: 0 - 9');
}

//CHECK#005F 
if (regexp_W.exec("_") !== null) {
  $ERROR('#2: _');
}

//CHECK#0020
var arr = regexp_W.exec(" "); 
if ((arr === null) || (arr[0] !== "\u0020")) {
  $ERROR('#2:  ');
}

