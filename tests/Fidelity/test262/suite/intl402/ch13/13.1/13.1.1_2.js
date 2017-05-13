// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that localeCompare coerces this to a string.
 * @author Norbert Lindenberg
 */

var thisValues = [true, 5, "hello", {toString: function () { return "good bye"; }}];
var thatValues = ["true", "5", "hello", "good bye"];

var i;
for (i = 0; i < thisValues.length; i++) {
    var j;
    for (j = 0; j < thatValues.length; j++) {
        var result = String.prototype.localeCompare.call(thisValues[i], thatValues[j]);
        if ((result === 0) !== (i === j)) {
            if (result === 0) {
                $ERROR("localeCompare treats " + thisValues[i] + " and " + thatValues[j] + " as equal.");
            } else {
                $ERROR("localeCompare treats " + thisValues[i] + " and " + thatValues[j] + " as different.");
            }
        }
    }
}

