// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is different from Type(y), return false
 *
 * @path ch11/11.9/11.9.4/S11.9.4_A8_T1.js
 * @description x or y is primitive boolean
 */

//CHECK#1
if (true === new Boolean(true)) {
  $ERROR('#1: true !== new Number(true)');
}

//CHECK#2
if (true === 1) {
  $ERROR('#2: true !== 1');
}

//CHECK#3
if (true === new Number(true)) {
  $ERROR('#3: true !== new Number(true)');
}

//CHECK#4
if (true === "1") {
  $ERROR('#4: true !== "1"');
}

//CHECK#5
if (true === new String(true)) {
  $ERROR('#5: true !== new String(true)');
}

//CHECK#6
if (new Boolean(false) === false) {
  $ERROR('#6: new Number(false) !== false');
}

//CHECK#7
if (0 === false) {
  $ERROR('#7: 0 !== false');
}

//CHECK#8
if (new Number(false) === false) {
  $ERROR('#8: new Number(false) !== false');
}

//CHECK#9
if ("0" === false) {
  $ERROR('#9: "0" !== false');
}

//CHECK#10
if (false === new String(false)) {
  $ERROR('#10: false !== new String(false)');
}

//CHECK#11
if (true === {valueOf: function () {return true}}) {
  $ERROR('#11: true === {valueOf: function () {return true}}');
}

