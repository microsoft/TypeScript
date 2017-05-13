// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: S evaluates by returning
 * the set of all characters not included in the set returned by
 * CharacterClassEscape :: s
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A2_T5.js
 * @description Tested string is "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~`!@#$%^&*()-+={[}]|\\:;'<,>./?" + '"'
 */

//CHECK#1
var non_s = "0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~`!@#$%^&*()-+={[}]|\\:;'<,>./?" + '"';
var regexp_S = /\S/g;
var k = 0;
while (regexp_S.exec(non_s) !== null) {
   k++;
}

if (non_s.length !== k) {
   $ERROR('#1: non-s');
}  

//CHECK#2
var non_S = '\f\n\r\t\v ';
if (/\S/.exec(non_S) !== null) {
   $ERROR('#2: non-S');
}

