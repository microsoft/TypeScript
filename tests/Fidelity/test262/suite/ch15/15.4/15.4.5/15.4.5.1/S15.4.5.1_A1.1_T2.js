// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToUint32(length) !== ToNumber(length), throw RangeError
 *
 * @path ch15/15.4/15.4.5/15.4.5.1/S15.4.5.1_A1.1_T2.js
 * @description length in [NaN, Infinity, -Infinity, undefined]
 */

//CHECK#1
try {
  var x = [];
  x.length = NaN;
  $ERROR('#1.1: x = []; x.length = NaN throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#1.2: x = []; x.length = NaN throw RangeError. Actual: ' + (e));
  }    
}

//CHECK#2
try {
  x = [];
  x.length = Number.POSITIVE_INFINITY;
  $ERROR('#2.1: x = []; x.length = Number.POSITIVE_INFINITY throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#2.2: x = []; x.length = Number.POSITIVE_INFINITY throw RangeError. Actual: ' + (e));
  }    
}

//CHECK#3
try {
  x = [];
  x.length = Number.NEGATIVE_INFINITY;
  $ERROR('#3.1: x = []; x.length = Number.NEGATIVE_INFINITY throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#3.2: x = []; x.length = Number.NEGATIVE_INFINITY throw RangeError. Actual: ' + (e));
  }    
}

//CHECK#4
try {
  x = [];
  x.length = undefined;
  $ERROR('#4.1: x = []; x.length = undefined throw RangeError. Actual: x.length === ' + (x.length));
} catch(e) {    
  if ((e instanceof RangeError) !== true) {
    $ERROR('#4.2: x = []; x.length = undefined throw RangeError. Actual: ' + (e));
  }    
}

