// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalLiteral :: .DecimalDigits ExponentPart
 *
 * @path ch07/7.8/7.8.3/S7.8.3_A2.2_T7.js
 * @description ExponentPart :: e 0
 */

//CHECK#0
if (.0e0 !== 0.0) {
  $ERROR('#0: .0e0 === 0.0');
}

//CHECK#1
if (.1e0 !== 0.1) {
  $ERROR('#1: .1e0 === 0.1');
}

//CHECK#2
if (.2e0 !== 0.2) {
  $ERROR('#2: .2e0 === 0.2');
}

//CHECK#3
if (.3e0 !== 0.3) {
  $ERROR('#3: .3e0 === 0.3');
}

//CHECK#4
if (.4e0 !== 0.4) {
  $ERROR('#4: .4e0 === 0.4');
}

//CHECK#5
if (.5e0 !== 0.5) {
  $ERROR('#5: .5e0 === 0.5');
}

//CHECK#6
if (.6e0 !== 0.6) {
  $ERROR('#6: .6e0 === 0.6');
}

//CHECK#7
if (.7e0 !== 0.7) {
  $ERROR('#7: .7e0 === 0.7');
}

//CHECK#8
if (.8e0 !== 0.8) {
  $ERROR('#8: .8e0 === 0.8');
}

//CHECK#9
if (.9e0 !== 0.9) {
  $ERROR('#9: .9e0 === 0.9');
}

