// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is different from Type(y), return true
 *
 * @path ch11/11.9/11.9.5/S11.9.5_A8_T2.js
 * @description x or y is primitive number
 */

//CHECK#1
if (!(1 !== new Number(1))) {
  $ERROR('#1: 1 !== new Number(1)');
}

//CHECK#2
if (!(1 !== true)) {
  $ERROR('#2: 1 !== true');
}

//CHECK#3
if (!(1 !== new Boolean(1))) {
  $ERROR('#3: 1 !== new Boolean(1)');
}

//CHECK#4
if (!(1 !== "1")) {
  $ERROR('#4: 1 !== "1"');
}

//CHECK#5
if (!(1 !== new String(1))) {
  $ERROR('#5: 1 !== new String(1)');
}

//CHECK#6
if (!(new Number(0) !== 0)) {
  $ERROR('#6: new Number(0) !== 0');
}

//CHECK#7
if (!(false !== 0)) {
  $ERROR('#7: false !== 0');
}

//CHECK#8
if (!(new Boolean(0) !== 0)) {
  $ERROR('#8: new Boolean(0) !== 0');
}

//CHECK#9
if (!("0" !== 0)) {
  $ERROR('#9: "0" !== 0');
}

//CHECK#10
if (!(new String(0) !== 0)) {
  $ERROR('#10: new String(0) !== 0');
}

//CHECK#11
if (!(1 !== {valueOf: function () {return 1}})) {
  $ERROR('#11: 1 !== {valueOf: function () {return 1}}');
}

