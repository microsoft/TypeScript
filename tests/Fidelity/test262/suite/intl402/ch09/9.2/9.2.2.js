// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that locales that are reported by resolvedOptions
 *     are also reported by supportedLocalesOf.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var info = getLocaleSupportInfo(Constructor);
    // this test should work equally for both matching algorithms
    ["lookup", "best fit"].forEach(function (matcher) {
        var supportedByConstructor = info.supported.concat(info.byFallback);
        var supported = Constructor.supportedLocalesOf(supportedByConstructor,
            {localeMatcher: matcher});
        // we could check the length first, but it's probably more interesting which locales are missing
        var i = 0;
        var limit = Math.min(supportedByConstructor.length, supported.length);
        while (i < limit && supportedByConstructor[i] === supported[i]) {
            i++;
        }
        if (i < supportedByConstructor.length) {
            $ERROR("Locale " + supportedByConstructor[i] +
                " is returned by resolvedOptions but not by supportedLocalesOf.");
        } else if (i < supported.length) {
            $ERROR("Locale " + supported[i] +
                " is returned by supportedLocalesOf but not by resolvedOptions.");
        }
    });
    
    // this test is only valid for lookup - best fit may find additional locales supported
    var unsupportedByConstructor = info.unsupported;
    var supported = Constructor.supportedLocalesOf(unsupportedByConstructor,
            {localeMatcher: "lookup"});
    if (supported.length > 0) {
        $ERROR("Locale " + supported[0] +
            " is returned by supportedLocalesOf but not by resolvedOptions.");
    }

    return true;
});

