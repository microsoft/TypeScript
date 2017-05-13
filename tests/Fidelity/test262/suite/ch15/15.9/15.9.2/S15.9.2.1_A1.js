// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Date is called as a function rather than as a constructor,
 * it should be "string" representing the current time (UTC)
 *
 * @path ch15/15.9/15.9.2/S15.9.2.1_A1.js
 * @description Checking type of returned value
 */

//CHECK#1
if( typeof Date() !== "string" ) {
  $ERROR('#1: typeof Date() should be "string", actual is '+(typeof Date()));
}

//CHECK#2
if( typeof Date(1) !== "string"  ) {
  $ERROR('#2: typeof Date(1) should be "string", actual is '+(typeof Date(1)));
}

//CHECK#3
if( typeof Date(1970, 1) !== "string"  ) {
  $ERROR('#3: typeof Date(1970, 1) should be "string", actual is '+(typeof Date(1970, 1)));
}

//CHECK#4
if( typeof Date(1970, 1, 1) !== "string"  ) {
  $ERROR('#4: typeof Date(1970, 1, 1) should be "string", actual is '+(typeof Date(1970, 1, 1)));
}

//CHECK#5
if( typeof Date(1970, 1, 1, 1) !== "string"  ) {
  $ERROR('#5: typeof Date(1970, 1, 1, 1) should be "string", actual is '+(typeof Date(1970, 1, 1, 1)));
}

//CHECK#6
if( typeof Date(1970, 1, 1, 1) !== "string"  ) {
  $ERROR('#7: typeof Date(1970, 1, 1, 1) should be "string", actual is '+(typeof Date(1970, 1, 1, 1)));
}

//CHECK#8
if( typeof Date(1970, 1, 1, 1, 0) !== "string"  ) {
  $ERROR('#8: typeof Date(1970, 1, 1, 1, 0) should be "string", actual is '+(typeof Date(1970, 1, 1, 1, 0)));
}

//CHECK#9
if( typeof Date(1970, 1, 1, 1, 0, 0) !== "string"  ) {
  $ERROR('#9: typeof Date(1970, 1, 1, 1, 0, 0) should be "string", actual is '+(typeof Date(1970, 1, 1, 1, 0, 0)));
}

//CHECK#10
if( typeof Date(1970, 1, 1, 1, 0, 0, 0) !== "string"  ) {
  $ERROR('#10: typeof Date(1970, 1, 1, 1, 0, 0, 0) should be "string", actual is '+(typeof Date(1970, 1, 1, 1, 0, 0, 0)));
}

//CHECK#11
if( typeof Date(Number.NaN) !== "string"  ) {
  $ERROR('#11: typeof Date(Number.NaN) should be "string", actual is '+(typeof Date(Number.NaN)));
}

//CHECK#12
if( typeof Date(Number.POSITIVE_INFINITY) !== "string"  ) {
  $ERROR('#12: typeof Date(Number.POSITIVE_INFINITY) should be "string", actual is '+(typeof Date(Number.POSITIVE_INFINITY)));
}

//CHECK#13
if( typeof Date(Number.NEGATIVE_INFINITY) !== "string"  ) {
  $ERROR('#13: typeof Date(Number.NEGATIVE_INFINITY) should be "string", actual is '+(typeof Date(Number.NEGATIVE_INFINITY)));
}

//CHECK#14
if( typeof Date(undefined) !== "string"  ) {
  $ERROR('#14: typeof Date(undefined) should be "string", actual is '+(typeof Date(undefined)));
}

//CHECK#15
if( typeof Date(null) !== "string"  ) {
  $ERROR('#15: typeof Date(null) should be "string", actual is '+(typeof Date(null)));
}

