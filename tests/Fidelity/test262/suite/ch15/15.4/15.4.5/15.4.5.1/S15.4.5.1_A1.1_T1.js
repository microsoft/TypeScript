// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToUint32(length) !== ToNumber(length), throw RangeError
 *
 * @path ch15/15.4/15.4.5/15.4.5.1/S15.4.5.1_A1.1_T1.js
 * @description length in [4294967296, -1, 1.5]
 */

//CHECK#1
try {
  var x = [];
  x.length = 4294967296;
  $ERROR('#1.1: x = []; x.length = 4294967296 throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#1.2: x = []; x.length = 4294967296 throw RangeError. Actual: ' + (e));
  }    
}

//CHECK#2
try {
  x = [];
  x.length = -1;
  $ERROR('#2.1: x = []; x.length = -1 throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#2.2: x = []; x.length = -1 throw RangeError. Actual: ' + (e));
  }    
}

//CHECK#3
try {
  x = [];
  x.length = 1.5;
  $ERROR('#3.1: x = []; x.length = 1.5 throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#3.2: x = []; x.length = 1.5 throw RangeError. Actual: ' + (e));
  }    
}

