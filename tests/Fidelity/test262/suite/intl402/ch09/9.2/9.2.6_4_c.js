// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that LookupSupportedLocales includes the default locale
 *     and doesn't include the "no linguistic content" locale.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    // this test should work equally for both matching algorithms
    ["lookup", "best fit"].forEach(function (matcher) {
        var defaultLocale = new Constructor().resolvedOptions().locale;
        var noLinguisticContent = "zxx";
        var supported = Constructor.supportedLocalesOf([defaultLocale, noLinguisticContent],
            {localeMatcher: matcher});
        if (supported.indexOf(defaultLocale) === -1) {
            $ERROR("SupportedLocales didn't return default locale with matcher " + matcher + ".");
        }
        if (supported.indexOf(noLinguisticContent) !== -1) {
            $ERROR("SupportedLocales returned the \"no linguistic content\" locale with matcher " + matcher + ".");
        }
        if (supported.length > 1) {
            $ERROR("SupportedLocales returned stray locales: " + supported.join(", ") + " with matcher " + matcher + ".");
        }
    });

    return true;
});

