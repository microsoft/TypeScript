// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Class]] property of the newly constructed object
 * is set to "Date"
 *
 * @path ch15/15.9/15.9.3/S15.9.3.1_A3_T6.2.js
 * @description Test based on overwriting prototype.toString - 7 arguments, (year, month, date, hours, minutes, seconds, ms)
 */

Date.prototype.toString = Object.prototype.toString;

var x1 = new Date(1899, 11, 31, 23, 59, 59, 999);
if (x1.toString() !== "[object Date]") {
  $FAIL("#1: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x2 = new Date(1899, 12, 1, 0, 0, 0, 0);
if (x2.toString() !== "[object Date]") {
  $FAIL("#2: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x3 = new Date(1900, 0, 1, 0, 0, 0, 0);
if (x3.toString() !== "[object Date]") {
  $FAIL("#3: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x4 = new Date(1969, 11, 31, 23, 59, 59, 999);
if (x4.toString() !== "[object Date]") {
  $FAIL("#4: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x5 = new Date(1969, 12, 1, 0, 0, 0, 0);
if (x5.toString() !== "[object Date]") {
  $FAIL("#5: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x6 = new Date(1970, 0, 1, 0, 0, 0, 0);
if (x6.toString() !== "[object Date]") {
  $FAIL("#6: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x7 = new Date(1999, 11, 31, 23, 59, 59, 999);
if (x7.toString() !== "[object Date]") {
  $FAIL("#7: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x8 = new Date(1999, 12, 1, 0, 0, 0, 0);
if (x8.toString() !== "[object Date]") {
  $FAIL("#8: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x9 = new Date(2000, 0, 1, 0, 0, 0, 0);
if (x9.toString() !== "[object Date]") {
  $FAIL("#9: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x10 = new Date(2099, 11, 31, 23, 59, 59, 999);
if (x10.toString() !== "[object Date]") {
  $FAIL("#10: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x11 = new Date(2099, 12, 1, 0, 0, 0, 0);
if (x11.toString() !== "[object Date]") {
  $FAIL("#11: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x12 = new Date(2100, 0, 1, 0, 0, 0, 0);
if (x12.toString() !== "[object Date]") {
  $FAIL("#12: The [[Class]] property of the newly constructed object is set to 'Date'");
}

