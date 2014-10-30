// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If neither x, nor y is a prefix of each other, returned result of strings comparison applies a simple lexicographic ordering to the sequences of code point value values
 *
 * @path ch11/11.8/11.8.1/S11.8.1_A4.12_T2.js
 * @description x and y are string primitives
 */

//CHECK#1
if (("0" < "x") !== true) {
  $ERROR('#1: ("0" < "x") !== true');
}

//CHECK#2
if (("-" < "0") !== true) {
  $ERROR('#2: ("-" < "0") !== true');
}

//CHECK#3
if (("." < "0") !== true) {
  $ERROR('#3: ("." < "0") !== true');
}

//CHECK#4
if (("+" < "-") !== true) {
  $ERROR('#4: ("+" < "-") !== true');
}

//CHECK#5
if (("-0" < "-1") !== true) {
  $ERROR('#5: ("-0" < "-1") !== true');
}

//CHECK#6
if (("+1" < "-1") !== true) {
  $ERROR('#6: ("+1" < "-1") !== true');
}

//CHECK#7
if (("1" < "1e-10") !== true) {
$ERROR('#7: ("1" < "1e-10") !== true');
}

