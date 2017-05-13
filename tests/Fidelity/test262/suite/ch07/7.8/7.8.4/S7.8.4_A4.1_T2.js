// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscapeSequnce :: SingleEscapeSequence
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A4.1_T2.js
 * @description SingleEscapeSequence :: one of ' " \
 */

//CHECK#1
if (String.fromCharCode(0x0027) !== "\'") {
  $ERROR('#1: String.fromCharCode(0x0027) === "\\\'"');
}

//CHECK#2
if (String.fromCharCode(0x0022) !== '\"') {
  $ERROR('#2: String.fromCharCode(0x0027) === \'\\\"\'');
}

//CHECK#3
if (String.fromCharCode(0x005C) !== "\\") {
  $ERROR('#3: String.fromCharCode(0x005C) === "\\\"');
}

//CHECK#4
if ("\'" !== "'") {
  $ERROR('#4: "\'" === "\\\'"');
}

//CHECK#5
if ('\"' !== '"') {
  $ERROR('#5: \'\"\' === \'\\\"\'');
}

