// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that canonicalization of locale lists treats undefined and empty lists the same.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    var supportedForUndefined = Constructor.supportedLocalesOf(undefined);
    var supportedForEmptyList = Constructor.supportedLocalesOf([]);
    if (supportedForUndefined.length !== supportedForEmptyList.length) {
        $ERROR("Supported locales differ between undefined and empty list input.");
    }
    // we don't compare the elements because length should be 0 - let's just verify that
    if (supportedForUndefined.length !== 0) {
        $ERROR("Internal test error: Assumption about length being 0 is invalid.");
    }
    return true;
});

