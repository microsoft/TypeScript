// Copyright 2012 Mozilla Corporation. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Tests that the array returned by SupportedLocales is extensible,
 *     but its properties are non-writable/non-configurable.
 * @author Norbert Lindenberg
 */

$INCLUDE("testIntl.js");

function testFrozenProperty(obj, property) {
    var desc = Object.getOwnPropertyDescriptor(obj, property);
    if (desc.writable) {
        $ERROR("Property " + property + " of object returned by SupportedLocales is writable.");
    }
    if (desc.configurable) {
        $ERROR("Property " + property + " of object returned by SupportedLocales is configurable.");
    }
}

testWithIntlConstructors(function (Constructor) {
    var defaultLocale = new Constructor().resolvedOptions().locale;
    var supported = Constructor.supportedLocalesOf([defaultLocale]);
    if (!Object.isExtensible(supported)) {
        $ERROR("Object returned by SupportedLocales is not extensible.");
    }
    for (var i = 0; i < supported.length; i++) {
        testFrozenProperty(supported, i);
    }
    testFrozenProperty(supported, "length");

    return true;
});

