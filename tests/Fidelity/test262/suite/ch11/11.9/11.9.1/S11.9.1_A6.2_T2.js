// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If one expression is undefined or null and another is not, return false
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A6.2_T2.js
 * @description y is null or undefined, x is not
 */

//CHECK#1
if ((false == undefined) !== false) {
  $ERROR('#1: (false == undefined) === false');
}

//CHECK#2
if ((Number.NaN == undefined) !== false) {
  $ERROR('#2: (Number.NaN == undefined) === false');
}

//CHECK#3
if (("undefined" == undefined) !== false) {
  $ERROR('#3: ("undefined" == undefined) === false');
}

//CHECK#4
if (({} == undefined) !== false) {
  $ERROR('#4: ({} == undefined) === false');
}

//CHECK#5
if ((false == null) !== false) {
  $ERROR('#5: (false == null) === false');
}

//CHECK#6
if ((0 == null) !== false) {
  $ERROR('#6: (0 == null) === false');
}

//CHECK#7
if (("null" == null) !== false) {
  $ERROR('#7: ("null" == null) === false');
}

//CHECK#8
if (({} == null) !== false) {
  $ERROR('#8: ({} == null) === false');
}

