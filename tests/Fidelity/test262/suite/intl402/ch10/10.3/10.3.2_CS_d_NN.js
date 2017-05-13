// Copyright 2011-2012 Norbert Lindenberg. All rights reserved.
// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the compare function supports different sensitivity settings.
 *     This test is not normative.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

// this test should be valid at least for the following locales
var locales = ["de", "en", "es", "it"];
locales = Intl.Collator.supportedLocalesOf(locales, {localeMatcher: "lookup"});
locales.forEach(function (locale) {
    var target = "Aa";
    var input = ["Aa", "bA", "E", "b", "aA", "fC", "áÁ", "Aã"];
    var expected = {
        "base": ["Aa", "aA", "áÁ", "Aã"],
        "accent": ["Aa", "aA"],
        "case": ["Aa", "Aã"],
        "variant": ["Aa"]
    };
    Object.getOwnPropertyNames(expected).forEach(function (sensitivity) {
        var collator = new Intl.Collator([locale], {usage: "search",
                sensitivity: sensitivity, localeMatcher: "lookup"});
        var matches = input.filter(function (v) {
            return collator.compare(v, target) === 0;
        });
        testArraysAreSame(expected[sensitivity], matches);
    });
});

