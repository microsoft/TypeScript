// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that well-formed currency codes are accepted.
 * @author Norbert Lindenberg
 */

var wellFormedCurrencyCodes = [
    "BOB",
    "EUR",
    "usd", // currency codes are case-insensitive
    "XdR",
    "xTs"
];

wellFormedCurrencyCodes.forEach(function (code) {
    // this must not throw an exception for a valid currency code
    var format = new Intl.NumberFormat(["de-de"], {style: "currency", currency: code});
    if (format.resolvedOptions().currency !== code.toUpperCase()) {
        $ERROR("Currency " + code + " was not correctly accepted; turned into " +
            format.resolvedOptions().currency + ".");
    }
});

