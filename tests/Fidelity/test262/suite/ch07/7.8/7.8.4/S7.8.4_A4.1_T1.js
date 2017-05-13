// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscapeSequnce :: SingleEscapeSequence
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A4.1_T1.js
 * @description SingleEscapeSequence :: one of b f n r t v
 */

//CHECK#1
if (String.fromCharCode(0x0008) !== "\b") {
  $ERROR('#1: String.fromCharCode(0x0008) === "\\b"');
}

//CHECK#2
if (String.fromCharCode(0x0009) !== "\t") {
  $ERROR('#2: String.fromCharCode(0x0009) === "\\t"');
}

//CHECK#3
if (String.fromCharCode(0x000A) !== "\n") {
  $ERROR('#3: String.fromCharCode(0x000A) === "\\n"');
}

//CHECK#4
if (String.fromCharCode(0x000B) !== "\v") {
  $ERROR('#4: String.fromCharCode(0x000B) === "\\v"');
}

//CHECK#5
if (String.fromCharCode(0x000C) !== "\f") {
  $ERROR('#5: String.fromCharCode(0x000C) === "\\f"');
}

//CHECK#6
if (String.fromCharCode(0x000D) !== "\r") {
  $ERROR('#6: String.fromCharCode(0x000D) === "\\r"');
}

