// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Value]] property of the newly constructed object
 * with supplied "undefined" argument should be NaN
 *
 * @path ch15/15.9/15.9.3/S15.9.3.1_A6_T2.js
 * @description 3 arguments, (year, month, date)
 */

function DateValue(year, month, date, hours, minutes, seconds, ms){
  return new Date(year, month, date, hours, minutes, seconds, ms).valueOf();
}

if (!isNaN(DateValue(1899, 11, 31))) {
  $FAIL("#1: The value should be NaN");
}

if (!isNaN(DateValue(1899, 12, 1))) {
  $FAIL("#2: The value should be NaN");
}

if (!isNaN(DateValue(1900, 0, 1))) {
  $FAIL("#3: The value should be NaN");
}

if (!isNaN(DateValue(1969, 11, 31))) {
  $FAIL("#4: The value should be NaN");
}

if (!isNaN(DateValue(1969, 12, 1))) {
  $FAIL("#5: The value should be NaN");
}

if (!isNaN(DateValue(1970, 0, 1))) {
  $FAIL("#6: The value should be NaN");
}

if (!isNaN(DateValue(1999, 11, 31))) {
  $FAIL("#7: The value should be NaN");
}

if (!isNaN(DateValue(1999, 12, 1))) {
  $FAIL("#8: The value should be NaN");
}

if (!isNaN(DateValue(2000, 0, 1))) {
  $FAIL("#9: The value should be NaN");
}

if (!isNaN(DateValue(2099, 11, 31))) {
  $FAIL("#10: The value should be NaN");
}

if (!isNaN(DateValue(2099, 12, 1))) {
  $FAIL("#11: The value should be NaN");
}

if (!isNaN(DateValue(2100, 0, 1))) {
  $FAIL("#12: The value should be NaN");
}

