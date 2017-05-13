// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that for non-object values passed as this to DateTimeFormat a
 * wrapper object will be initialized and returned.
 * @author Norbert Lindenberg
 */

var thisValues = [true, 42, "国際化"];

thisValues.forEach(function (value) {
    var format = Intl.DateTimeFormat.call(value);
    // check that the returned object functions as a date-time format
    var referenceFormat = new Intl.DateTimeFormat();
    if (Intl.DateTimeFormat.prototype.format.call(format, new Date(111111111)) !== referenceFormat.format(new Date(111111111))) {
        $ERROR("DateTimeFormat initialized from " + value + " doesn't behave like normal date-time format.");
    }
    return true;
});

