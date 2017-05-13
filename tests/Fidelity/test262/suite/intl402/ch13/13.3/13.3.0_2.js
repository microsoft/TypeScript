// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Date.prototype.toLocaleString & Co. handle non-finite values correctly.
 * @author Norbert Lindenberg
 */

var functions = {
    toLocaleString: Date.prototype.toLocaleString,
    toLocaleDateString: Date.prototype.toLocaleDateString,
    toLocaleTimeString: Date.prototype.toLocaleTimeString
};
var invalidValues = [NaN, Infinity, -Infinity];

Object.getOwnPropertyNames(functions).forEach(function (p) {
    var f = functions[p];
    invalidValues.forEach(function (value) {
        var result = f.call(new Date(value));
        if (result !== "Invalid Date") {
            $ERROR("Date.prototype." + p + " did not return \"Invalid Date\" for " +
                value + " – got " + result + " instead.");
        }
    });
});

