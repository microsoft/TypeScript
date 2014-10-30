// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that toLocaleString handles "this Number value" correctly.
 * @author Norbert Lindenberg
 */

var invalidValues = [undefined, null, "5", false, {valueOf: function () { return 5; }}];
var validValues = [5, NaN, -1234567.89, -Infinity];

invalidValues.forEach(function (value) {
    var error;
    try {
        var result = Number.prototype.toLocaleString.call(value);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Number.prototype.toLocaleString did not reject this = " + value + ".");
    } else if (error.name !== "TypeError") {
        $ERROR("Number.prototype.toLocaleString rejected this = " + value + " with wrong error " + error.name + ".");
    }
});

// for valid values, just check that a Number value and the corresponding
// Number object get the same result.
validValues.forEach(function (value) {
    var Constructor = Number; // to keep jshint happy
    var valueResult = Number.prototype.toLocaleString.call(value);
    var objectResult = Number.prototype.toLocaleString.call(new Constructor(value));
    if (valueResult !== objectResult) {
        $ERROR("Number.prototype.toLocaleString produces different results for Number value " +
            value + " and corresponding Number object: " + valueResult + " vs. " + objectResult + ".");
    }
});

