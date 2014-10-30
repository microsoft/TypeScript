// Copyright 2011-2012 Norbert Lindenberg. All rights reserved.
// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the digits are determined correctly when specifying significant digits.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

var locales = [
    new Intl.NumberFormat().resolvedOptions().locale,
    "ar", "de", "th", "ja"
];
var numberingSystems = [
    "arab",
    "latn",
    "thai",
    "hanidec"
];
var testData = {
    "0": "0.00",
    "-0": "0.00",
    "123": "123",
    "-123": "-123",
    "12345": "12345",
    "-12345": "-12345",
    "123.45": "123.45",
    "-123.45": "-123.45",
    "123.44501": "123.45",
    "-123.44501": "-123.45",
    "0.001234": "0.001234",
    "-0.001234": "-0.001234",
    "0.00000000123": "0.00000000123",
    "-0.00000000123": "-0.00000000123",
    "0.00000000000000000000000000000123": "0.00000000000000000000000000000123",
    "-0.00000000000000000000000000000123": "-0.00000000000000000000000000000123",
    "1.2": "1.20",
    "-1.2": "-1.20",
    "0.0000000012344501": "0.0000000012345",
    "-0.0000000012344501": "-0.0000000012345",
    "123445.01": "123450",
    "-123445.01": "-123450",
    "12344501000000000000000000000000000": "12345000000000000000000000000000000",
    "-12344501000000000000000000000000000": "-12345000000000000000000000000000000"
};

testNumberFormat(locales, numberingSystems,
    {useGrouping: false, minimumSignificantDigits: 3, maximumSignificantDigits: 5},
    testData);

