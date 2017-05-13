// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: W evaluates by returning the set of all characters not
 * included in the set returned by CharacterClassEscape :: w
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A4_T5.js
 * @description non-w
 */

//CHECK#1
var non_w = "\f\n\r\t\v~`!@#$%^&*()-+={[}]|\\:;'<,>./? " + '"';
var regexp_W = /\W/g;
var k = 0;
while (regexp_W.exec(non_w) !== null) {
   k++;
}

if (non_w.length !== k) {
   $ERROR('#1: non-w');
}

//CHECK#2
var non_W = "_0123456789_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
if (/\W/.exec(non_W) !== null) {
   $ERROR('#2: non-W');
}

