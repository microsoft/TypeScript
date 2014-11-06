// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: d evaluates by returning the ten-element set of characters containing the characters 0 through 9 inclusive
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A5_T2.js
 * @description ENGLISH ALPHABET
 */

var regexp_d = /\d/;

//CHECK#0041-005A
var result = true; 
for (alpha = 0x0041; alpha <= 0x005A; alpha++) {
  if (regexp_d.exec(String.fromCharCode(alpha)) !== null) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: ENGLISH CAPITAL ALPHABET');
}  

//CHECK#0061-007A
var result = true; 
for (alpha = 0x0061; alpha <= 0x007A; alpha++) {
  if (regexp_d.exec(String.fromCharCode(alpha)) !== null) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#2: english small alphabet');
} 

