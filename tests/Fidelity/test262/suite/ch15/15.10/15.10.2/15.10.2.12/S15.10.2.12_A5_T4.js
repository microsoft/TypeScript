// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: d evaluates by returning the ten-element set of characters containing the characters 0 through 9 inclusive
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A5_T4.js
 * @description non-d
 */

//CHECK#1
var non_d = "_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ\f\n\r\t\v~`!@#$%^&*()-+={[}]|\\:;'<,>./? " + '"';
if (/\d/.exec(non_d) !== null) {
   $ERROR('#1: non-d');
}

//CHECK#2
var non_D = '0123456789';
var regexp_d = /\d/g;
var k = 0;
while (regexp_d.exec(non_D) !== null) {
   k++;
}

if (non_D.length !== k) {
   $ERROR('#2: non-D');
}  

