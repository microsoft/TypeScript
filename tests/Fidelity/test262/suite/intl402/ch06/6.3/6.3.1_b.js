// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that invalid currency codes are not accepted.
 * @author Norbert Lindenberg
 */

var invalidCurrencyCodes = [
    "€",
    "$",
    "SFr.",
    "DM",
    "KR₩",
    "702",
    "ßP",
    "ınr"
];

invalidCurrencyCodes.forEach(function (code) {
    var error;
    try {
        // this must throw an exception for an invalid currency code
        var format = new Intl.NumberFormat(["de-de"], {style: "currency", currency: code});
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Invalid currency code " + code + " was not rejected.");
    } else if (error.name !== "RangeError") {
        $ERROR("Invalid currency code " + code + " was rejected with wrong error " + error.name + ".");
    }
});

