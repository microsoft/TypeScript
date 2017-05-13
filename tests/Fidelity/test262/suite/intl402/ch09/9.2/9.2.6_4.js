// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that LookupSupportedLocales returns an empty list when
 *     given an empty list.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    // this test should work equally for both matching algorithms
    ["lookup", "best fit"].forEach(function (matcher) {
        var supported = Constructor.supportedLocalesOf([], {localeMatcher: matcher});
        if (supported.length !== 0) {
            $ERROR("SupportedLocales with matcher " + matcher + " returned a non-empty list for an empty list.");
        }
    });

    return true;
});

