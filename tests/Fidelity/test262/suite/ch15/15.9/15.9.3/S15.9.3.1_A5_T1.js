// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Value]] property of the newly constructed object
 * is set by following steps:
 * 8. If Result(1) is not NaN and 0 <= ToInteger(Result(1)) <= 99, Result(8) is
 * 1900+ToInteger(Result(1)); otherwise, Result(8) is Result(1)
 * 9. Compute MakeDay(Result(8), Result(2), Result(3))
 * 10. Compute MakeTime(Result(4), Result(5), Result(6), Result(7))
 * 11. Compute MakeDate(Result(9), Result(10))
 * 12. Set the [[Value]] property of the newly constructed object to
 * TimeClip(UTC(Result(11)))
 *
 * @path ch15/15.9/15.9.3/S15.9.3.1_A5_T1.js
 * @description 2 arguments, (year, month)
 */

$INCLUDE("environment.js");
$INCLUDE("numeric_conversion.js");
$INCLUDE("Date_constants.js");
$INCLUDE("Date_library.js");

if (-2211638400000 !== new Date(1899, 11).valueOf()) {
  $FAIL("#1: Incorrect value of Date");
}

if (-2208960000000 !== new Date(1899, 12).valueOf()) {
  $FAIL("#2: Incorrect value of Date");
}

if (-2208960000000 !== new Date(1900, 0).valueOf()) {
  $FAIL("#3: Incorrect value of Date");
}

if (-2649600000 !== new Date(1969, 11).valueOf()) {
  $FAIL("#4: Incorrect value of Date");
}

if (28800000 !== new Date(1969, 12).valueOf()) {
  $FAIL("#5: Incorrect value of Date");
}

if (28800000 !== new Date(1970, 0).valueOf()) {
  $FAIL("#6: Incorrect value of Date");
}

if (944035200000 !== new Date(1999, 11).valueOf()) {
  $FAIL("#7: Incorrect value of Date");
}

if (946713600000 !== new Date(1999, 12).valueOf()) {
  $FAIL("#8: Incorrect value of Date");
}

if (946713600000 !== new Date(2000, 0).valueOf()) {
  $FAIL("#9: Incorrect value of Date");
}

if (4099795200000 !== new Date(2099, 11).valueOf()) {
  $FAIL("#10: Incorrect value of Date");
}

if (4102473600000 !== new Date(2099, 12).valueOf()) {
  $FAIL("#11: Incorrect value of Date");
}

if (4102473600000 !== new Date(2100, 0).valueOf()) {
  $FAIL("#12: Incorrect value of Date");
}

