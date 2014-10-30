// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that localeCompare rejects values that can't be coerced to an object.
 * @author Norbert Lindenberg
 */

var invalidValues = [undefined, null];
 
invalidValues.forEach(function (value) {
    var error;
    try {
        var result = String.prototype.localeCompare.call(value, "");
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("String.prototype.localeCompare did not reject this = " + value + ".");
    } else if (error.name !== "TypeError") {
        $ERROR("String.prototype.localeCompare rejected this = " + value + " with wrong error " + error.name + ".");
    }
});

