// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that valid time zone names are accepted.
 * @author Norbert Lindenberg
 */

var validTimeZoneNames = [
    "UTC",
    "utc" // time zone names are case-insensitive
];

validTimeZoneNames.forEach(function (name) {
    // this must not throw an exception for a valid time zone name
    var format = new Intl.DateTimeFormat(["de-de"], {timeZone: name});
    if (format.resolvedOptions().timeZone !== name.toUpperCase()) {
        $ERROR("Time zone name " + name + " was not correctly accepted; turned into " +
            format.resolvedOptions().timeZone + ".");
    }
});

