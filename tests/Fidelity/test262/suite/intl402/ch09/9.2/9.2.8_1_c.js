// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the option localeMatcher is processed correctly.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var defaultLocale = new Constructor().resolvedOptions().locale;
    
    var validValues = [undefined, "lookup", "best fit", {toString: function () { return "lookup"; }}];
    validValues.forEach(function (value) {
        var supported = Constructor.supportedLocalesOf([defaultLocale], {localeMatcher: value});
    });
    
    var invalidValues = [null, 0, 5, NaN, true, false, "invalid"];
    invalidValues.forEach(function (value) {
        var error;
        try {
            var supported = Constructor.supportedLocalesOf([defaultLocale], {localeMatcher: value});
        } catch (e) {
            error = e;
        }
        if (error === undefined) {
            $ERROR("Invalid localeMatcher value " + value + " was not rejected.");
        } else if (error.name !== "RangeError") {
            $ERROR("Invalid localeMatcher value " + value + " was rejected with wrong error " + error.name + ".");
        }
    });
    
    return true;
});

