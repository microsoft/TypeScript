// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that non-objects are converted to objects before canonicalization.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

testWithIntlConstructors(function (Constructor) {
    // undefined is handled separately
    
    // null should result in a TypeError
    var error;
    try {
        var supportedForNull = Constructor.supportedLocalesOf(null);
    } catch (e) {
        error = e;
    }
    if (error === undefined) {
        $ERROR("Null as locale list was not rejected.");
    } else if (error.name !== "TypeError") {
        $ERROR("Null as locale list was rejected with wrong error " + error.name + ".");
    }    
    
    // let's use an empty list for comparison
    var supportedForEmptyList = Constructor.supportedLocalesOf([]);
    // we don't compare the elements because length should be 0 - let's just verify that
    if (supportedForEmptyList.length !== 0) {
        $ERROR("Internal test error: Assumption about length being 0 is invalid.");
    }

    // most non-objects will be interpreted as empty lists because a missing length property is interpreted as 0
    var supportedForNumber = Constructor.supportedLocalesOf(5);
    if (supportedForNumber.length !== supportedForEmptyList.length) {
        $ERROR("Supported locales differ between numeric and empty list input.");
    }
    var supportedForBoolean = Constructor.supportedLocalesOf(true);
    if (supportedForBoolean.length !== supportedForEmptyList.length) {
        $ERROR("Supported locales differ between boolean and empty list input.");
    }
    
    return true;
});

