// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that Unicode locale extension sequences do not affect
 *    whether a locale is considered supported, but are reported back.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    // this test should work equally for both matching algorithms
    ["lookup", "best fit"].forEach(function (matcher) {
        var info = getLocaleSupportInfo(Constructor);
        var allLocales = info.supported.concat(info.byFallback, info.unsupported);
        allLocales.forEach(function (locale) {
            var validExtension = "-u-co-phonebk-nu-latn";
            var invalidExtension = "-u-nu-invalid";
            var supported1 = Constructor.supportedLocalesOf([locale],
                {localeMatcher: matcher});
            var supported2 = Constructor.supportedLocalesOf([locale + validExtension],
                {localeMatcher: matcher});
            var supported3 = Constructor.supportedLocalesOf([locale + invalidExtension],
                {localeMatcher: matcher});
            if (supported1.length === 1) {
                if (supported2.length !== 1 || supported3.length !== 1) {
                    $ERROR("Presence of Unicode locale extension sequence affects whether locale " +
                        locale + " is considered supported with matcher " + matcher + ".");
                }
                if (supported2[0] !== locale + validExtension || supported3[0] !== locale + invalidExtension) {
                    alert(locale + "; " + supported2[0] + "; " + supported3[0]);
                    $ERROR("Unicode locale extension sequence is not correctly returned for locale " +
                        locale + " with matcher " + matcher + ".");
                }
            } else {
                if (supported2.length !== 0 || supported3.length !== 0) {
                    $ERROR("Presence of Unicode locale extension sequence affects whether locale " +
                        locale + " is considered supported with matcher " + matcher + ".");
                }
            }
        });
    });

    return true;
});

