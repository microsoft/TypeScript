// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the behavior of a List is not affected by adversarial
 *     changes to Array.prototype.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

taintArray();

testWithIntlConstructors(function (Constructor) {
    var defaultLocale = new Constructor().resolvedOptions().locale;
    var canonicalized = Constructor.supportedLocalesOf([defaultLocale, defaultLocale]);
    if (canonicalized.length > 1) {
        $ERROR("Canonicalization didn't remove duplicate language tags from locale list.");
    }
});

