// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: s evaluates by returning the set of characters
 * containing the characters that are on the right-hand side of the WhiteSpace (7.2) or LineTerminator (7.3) productions
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A1_T3.js
 * @description ENGLISH ALPHABET
 */

var regexp_s = /\s/;

//CHECK#0041-005A
var result = true; 
for (alpha = 0x0041; alpha <= 0x005A; alpha++) {
  if (regexp_s.exec(String.fromCharCode(alpha)) !== null) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: ENGLISH CAPITAL ALPHABET');
}  

//CHECK#0061-007A
var result = true; 
for (alpha = 0x0061; alpha <= 0x007A; alpha++) {
  if (regexp_s.exec(String.fromCharCode(alpha)) !== null) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#2: english small alphabet');
} 

