// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: w evaluates by returning the set of characters containing the sixty-three characters:
 * a - z, A - Z, 0 - 9, _
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A3_T5.js
 * @description non-w
 */

//CHECK#1
var non_w = "\f\n\r\t\v~`!@#$%^&*()-+={[}]|\\:;'<,>./? " + '"';
if (/\w/.exec(non_w) !== null) {
   $ERROR('#1: non-w');
}

//CHECK#2
var non_W = "_0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
var regexp_w = /\w/g;
var k = 0;
while (regexp_w.exec(non_W) !== null) {
   k++;
}

if (non_W.length !== k) {
   $ERROR('#2: non-W');
}  

