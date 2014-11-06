// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that default locale is available.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var defaultLocale = new Constructor().resolvedOptions().locale;
    var supportedLocales = Constructor.supportedLocalesOf([defaultLocale]);
    if (supportedLocales.indexOf(defaultLocale) === -1) {
        $ERROR("Default locale is not reported as available.");
    }
});

