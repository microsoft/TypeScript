// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option formatMatcher is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testOption(Intl.DateTimeFormat, "formatMatcher", "string", ["basic", "best fit"], "best fit", {noReturn: true});

