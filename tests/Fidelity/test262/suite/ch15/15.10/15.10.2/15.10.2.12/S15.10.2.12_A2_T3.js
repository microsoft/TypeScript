// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: S evaluates by returning
 * the set of all characters not included in the set returned by
 * CharacterClassEscape :: s
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A2_T3.js
 * @description ENGLISH ALPHABET
 */

var regexp_S = /\S/;

//CHECK#0041-005A
var result = true;
for (alpha = 0x0041; alpha <= 0x005A; alpha++) {
  str = String.fromCharCode(alpha);
  arr = regexp_S.exec(str); 
  if ((arr === null) || (arr[0] !== str)) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: ENGLISH CAPITAL ALPHABET');
}  

//CHECK#0061-007A
var result = true; 
for (alpha = 0x0061; alpha <= 0x007A; alpha++) {
  str = String.fromCharCode(alpha);
  arr = regexp_S.exec(str); 
  if ((arr === null) || (arr[0] !== str)) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#2: english small alphabet');
} 

