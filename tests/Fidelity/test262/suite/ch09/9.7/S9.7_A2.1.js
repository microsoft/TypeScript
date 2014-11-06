// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToUint16 returns values between 0 and 2^16-1
 *
 * @path ch09/9.7/S9.7_A2.1.js
 * @description Converting numbers, which are in\outside of Uint16 scopes, with String.fromCharCode(Number).charCodeAt(0) construction
 */

// CHECK#1
if (String.fromCharCode(0).charCodeAt(0) !== 0) {
  $ERROR('#1: String.fromCharCode(0).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(0).charCodeAt(0)));
}

// CHECK#2
if (String.fromCharCode(1).charCodeAt(0) !== 1) {
  $ERROR('#2: String.fromCharCode(1).charCodeAt(0) === 1. Actual: ' + (String.fromCharCode(1).charCodeAt(0)));
}

// CHECK#3
if (String.fromCharCode(-1).charCodeAt(0) !== 65535) {
  $ERROR('#3: String.fromCharCode(-1).charCodeAt(0) === 65535. Actual: ' + (String.fromCharCode(-1).charCodeAt(0)));
}

// CHECK#4
if (String.fromCharCode(65535).charCodeAt(0) !== 65535) {
  $ERROR('#4: String.fromCharCode(65535).charCodeAt(0) === 65535. Actual: ' + (String.fromCharCode(65535).charCodeAt(0)));
}

// CHECK#5
if (String.fromCharCode(65534).charCodeAt(0) !== 65534) {
  $ERROR('#5: String.fromCharCode(65534).charCodeAt(0) === 65534. Actual: ' + (String.fromCharCode(65534).charCodeAt(0)));
}

// CHECK#6
if (String.fromCharCode(65536).charCodeAt(0) !== 0) {
  $ERROR('#6: String.fromCharCode(65536).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(65536).charCodeAt(0)));
}

// CHECK#7
if (String.fromCharCode(4294967295).charCodeAt(0) !== 65535) {
  $ERROR('#7: String.fromCharCode(4294967295).charCodeAt(0) === 65535. Actual: ' + (String.fromCharCode(4294967295).charCodeAt(0)));
}

// CHECK#8
if (String.fromCharCode(4294967294).charCodeAt(0) !== 65534) {
  $ERROR('#8: String.fromCharCode(4294967294).charCodeAt(0) === 65534. Actual: ' + (String.fromCharCode(4294967294).charCodeAt(0)));
}

// CHECK#9
if (String.fromCharCode(4294967296).charCodeAt(0) !== 0) {
  $ERROR('#9: String.fromCharCode(4294967296).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(4294967296).charCodeAt(0)));
}

