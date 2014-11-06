// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Class]] property of the newly constructed object
 * is set to "Date"
 *
 * @path ch15/15.9/15.9.3/S15.9.3.2_A3_T1.1.js
 * @description Test based on delete prototype.toString
 */

$INCLUDE("Date_constants.js");

var x1 = new Date(date_1899_end);
if (Object.prototype.toString.call(x1) !== "[object Date]") {
  $FAIL("#1: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x2 = new Date(date_1900_start);
if (Object.prototype.toString.call(x2) !== "[object Date]") {
  $FAIL("#2: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x3 = new Date(date_1969_end);
if (Object.prototype.toString.call(x3) !== "[object Date]") {
  $FAIL("#3: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x4 = new Date(date_1970_start);
if (Object.prototype.toString.call(x4) !== "[object Date]") {
  $FAIL("#4: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x5 = new Date(date_1999_end);
if (Object.prototype.toString.call(x5) !== "[object Date]") {
  $FAIL("#5: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x6 = new Date(date_2000_start);
if (Object.prototype.toString.call(x6) !== "[object Date]") {
  $FAIL("#6: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x7 = new Date(date_2099_end);
if (Object.prototype.toString.call(x7) !== "[object Date]") {
  $FAIL("#7: The [[Class]] property of the newly constructed object is set to 'Date'");
}

var x8 = new Date(date_2100_start);
if (Object.prototype.toString.call(x8) !== "[object Date]") {
  $FAIL("#8: The [[Class]] property of the newly constructed object is set to 'Date'");
}

