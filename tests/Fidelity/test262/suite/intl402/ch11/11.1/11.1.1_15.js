// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option style is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testOption(Intl.NumberFormat, "style", "string", ["decimal", "percent", "currency"], "decimal",
        {extra: {"currency": {currency: "CNY"}}});

